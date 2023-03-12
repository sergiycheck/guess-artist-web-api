import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import configuration from '../../config/configuration.js';

import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';

import { AllExceptionsFilter } from '../../common/filters/all-exceptions.filter.js';
import { CustomConnectionService } from '../../common/resources/common/mongoose-connection.service.js';
import { CustomLoggerModule } from '../../common/logger/custom-logger.module.js';
import { ItunesApiModule } from '../itunes-api/itunes-api.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>(
          'database.monboDbConnectionString',
        );
        const options:
          | MongooseModuleFactoryOptions
          | Promise<MongooseModuleFactoryOptions> = {
          uri,
        };

        return options;
      },
      inject: [ConfigService],
    }),

    ItunesApiModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    CustomConnectionService,
    AppService,
    AllExceptionsFilter,
    { provide: APP_FILTER, useExisting: AllExceptionsFilter },
  ],
})
export class AppModule {}
