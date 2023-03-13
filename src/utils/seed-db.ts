import { Connection, Model } from 'mongoose';
import { EntitiesDocumentNames } from '../common/resources/common/base-entities.js';
import { CustomLogger } from '../common/logger/custom-logger.service.js';
import { ArtistDocument } from '../resources/artists/artist.schema.js';
import { AlbumDocument } from '../resources/itunes-api/entities/album.entity.js';
import { INestApplicationContext } from '@nestjs/common';
import { ItunesApiService } from '../resources/itunes-api/itunes-api.service.js';
import { PredefinedArtistsEnum } from '../resources/itunes-api/dtos/search-dtos.dto.js';
import { AlbumDbService } from '../resources/itunes-api/album-db.service.js';

export class DbInitializer {
  constructor(
    private readonly connection: Connection,
    private logger: CustomLogger,
    //
    public usersCollName = `${EntitiesDocumentNames.User.toLocaleLowerCase()}s`,
    public artistsCollName = `${EntitiesDocumentNames.Artist.toLocaleLowerCase()}s`,
  ) {}

  public async seedManyDocumentsIntoDb(app: INestApplicationContext) {
    const ArtistModel = (await this.connection.model(
      EntitiesDocumentNames.Artist,
    )) as Model<ArtistDocument>;

    const AlbumModel = (await this.connection.model(
      EntitiesDocumentNames.Album,
    )) as Model<AlbumDocument>;

    const initialArtists = [
      {
        name: 'The Beatles',
      },
      {
        name: 'Jack Johnson',
      },
      {
        name: 'Bob Dylan',
      },
      {
        name: 'Eminem',
      },
      {
        name: 'Taylor Swift',
      },
      {
        name: 'Rihanna',
      },
      {
        name: 'Katy Perry',
      },
      {
        name: 'Justin Bieber',
      },
      {
        name: 'Justin Bieber',
      },
      {
        name: 'Queen',
      },
      {
        name: 'AC/DC',
      },
    ];

    await ArtistModel.create(initialArtists);

    const itunesApiService = app.get(ItunesApiService);

    for (let artist of initialArtists) {
      const term = artist.name as keyof typeof PredefinedArtistsEnum;

      const res = await itunesApiService.getAlbumsByArtist({
        term,
        country: 'US',
      });

      await AlbumModel.create(res.results);

      this.logger.log(`${term} was populated!`);
    }
  }
}
