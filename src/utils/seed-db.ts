import { Connection, Model } from 'mongoose';
import { EntitiesDocumentNames } from '../common/resources/common/base-entities.js';
import { CustomLogger } from '../common/logger/custom-logger.service.js';
import { ArtistDocument } from '../resources/artists/artist.schema.js';

export class DbInitializer {
  constructor(
    private readonly connection: Connection,
    private logger: CustomLogger,
    //
    public usersCollName = `${EntitiesDocumentNames.User.toLocaleLowerCase()}s`,
    public artistsCollName = `${EntitiesDocumentNames.Artist.toLocaleLowerCase()}s`,
  ) {}

  public async seedManyDocumentsIntoDb() {
    const ArtistModel = (await this.connection.model(
      EntitiesDocumentNames.Artist,
    )) as Model<ArtistDocument>;

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
  }
}
