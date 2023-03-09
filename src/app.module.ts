import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoralisQuickstartService } from './moralis-quickstart/moralis-quickstart.service';
import { MoralisQuickstartController } from './moralis-quickstart/moralis-quickstart.controller';
import configuration from './config/configuration';
// import joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => configuration],
      // validationSchema: joi.object({
      //   port: joi.number().required(),
      //   database: joi
      //     .object({
      //       host: joi.string(),
      //       port: joi.number(),
      //     })
      //     .required(),
      //   moralis: joi
      //     .object({
      //       apiKey: joi.string(),
      //     })
      //     .required(),
      // }),
    }),
  ],
  controllers: [AppController, MoralisQuickstartController],
  providers: [AppService, MoralisQuickstartService],
})
export class AppModule {}
