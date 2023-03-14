import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArtistService } from '../artists/artists.service.js';
import { UserService } from '../user/user.service.js';
import { CustomLogger } from './../../common/logger/custom-logger.service.js';
import { AlbumDbService } from './album-db.service.js';
import { AlbumResponse } from './dtos/responses.dto.js';
import { ItunesApiService } from './itunes-api.service.js';

@Injectable()
export class AlbumTaskService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly itunesService: ItunesApiService,
    private readonly albumDbService: AlbumDbService,
    private readonly artistService: ArtistService,
    private readonly userService: UserService,
  ) {}

  @Cron('0 14 * * *')
  async findAndLogTop3PlayersToFile() {
    const to3Players = await this.userService.findTop3Players();

    const playerNames = to3Players.data.map((player) => player.name).join(', ');

    this.logger.logToFile(`
      Top three players: ${playerNames}`);
  }

  @Cron('0 14 * * *')
  async populateAlbumsAndWriteToFile() {
    this.logger.log('Populating albums every day at 2pm.');

    const allArtists = await this.artistService.findAllMapped();

    let newAlbums: AlbumResponse[] = [];

    for (let artist of allArtists.data) {
      this.logger.log(`Populating artist ${artist.name}`);

      const res = await this.itunesService.getAlbumsByArtist({
        term: artist.name,
        country: 'US',
        limit: '5',
      });

      const { data } = await this.albumDbService.checkIfExistsAndInsertMany(
        res.results,
      );

      newAlbums.push(...data);
    }

    this.logger.log(`Populating finished.`);

    if (newAlbums.length) {
      this.logNewAlbumsToFiles(newAlbums);
    }
  }

  async logNewAlbumsToFiles(data: AlbumResponse[]) {
    const newAlbums = data.map((album) => album.collectionName);

    this.logger.logToFile(`
      New albums available: ${newAlbums.join(', ')}`);
  }
}
