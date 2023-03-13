import { Module } from '@nestjs/common';
import { ItunesApiService } from './itunes-api.service.js';
import { ItunesApiController } from './itunes-api.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './entities/album.entity.js';
import { AlbumDbService } from './album-db.service.js';
import { ResponseMapperModule } from './../../common/resources/common/responseMapper/response-mapper.module.js';
import { AlbumTaskService } from './album-tasts.service.js';
import { CustomLoggerModule } from '../../common/logger/custom-logger.module.js';
import { ArtistModule } from '../artists/artist.module.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    ResponseMapperModule,
    CustomLoggerModule,
    ArtistModule,
    UserModule,
  ],
  providers: [ItunesApiService, AlbumDbService, AlbumTaskService],
  controllers: [ItunesApiController],
})
export class ItunesApiModule {}
