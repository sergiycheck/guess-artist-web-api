import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArtistService } from '../artists/artists.service.js';
import { CustomLogger } from './../../common/logger/custom-logger.service.js';
import { AlbumDbService } from './album-db.service.js';
import { ItunesApiService } from './itunes-api.service.js';

@Injectable()
export class AlbumTaskService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly itunesService: ItunesApiService,
    private readonly albumDbService: AlbumDbService,
    private readonly artistService: ArtistService,
  ) {}

  @Cron('0 14 * * *')
  async handleCron() {
    this.logger.log('Populating albums every day at 2pm.');

    const allArtists = await this.artistService.findAllMapped();

    for (let artist of allArtists.data) {
      this.logger.log(`Populating artist ${artist.name}`);

      const res = await this.itunesService.getAlbumsByArtist({
        term: artist.name,
        country: 'US',
        limit: '5',
      });

      await this.albumDbService.checkIfExistsAndBatchCreate(res.results);
    }

    this.logger.log(`Populating finished.`);
  }
}
