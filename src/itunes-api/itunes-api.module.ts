import { Module } from '@nestjs/common';
import { ItunesApiService } from './itunes-api.service.js';
import { ItunesApiController } from './itunes-api.controller.js';

@Module({
  providers: [ItunesApiService],
  controllers: [ItunesApiController],
})
export class ItunesApiModule {}
