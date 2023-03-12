import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist.schema.js';
import { ArtistsController } from './artists.controller.js';
import { ArtistService } from './artists.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistService],
})
export class ArtistModule {}
