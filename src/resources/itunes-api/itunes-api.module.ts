import { Module } from '@nestjs/common';
import { ItunesApiService } from './itunes-api.service.js';
import { ItunesApiController } from './itunes-api.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './entities/album.entity.js';
import { AlbumDbService } from './album-db.service.js';
import { ResponseMapperModule } from './../../common/resources/common/responseMapper/response-mapper.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    ResponseMapperModule,
  ],
  providers: [ItunesApiService, AlbumDbService],
  controllers: [ItunesApiController],
})
export class ItunesApiModule {}
