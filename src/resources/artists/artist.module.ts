import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist.schema.js';
import { ArtistsController } from './artists.controller.js';
import { ArtistService } from './artists.service.js';
import { ResponseMapperModule } from '../../common/resources/common/responseMapper/response-mapper.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    ResponseMapperModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
