import { Module } from '@nestjs/common';

import { UserRes } from '../../../../resources/user/dto/responses.dto.js';
import { UserDocument } from '../../../../resources/user/entities/user.entity.js';

import { ArtistDocument } from './../../../../resources/artists/artist.schema.js';
import { ArtistResponse } from './../../../../resources/artists/dtos.dto.js';

import {
  createResponseMapper,
  ResponseMapperInjectedNames,
} from './responseMapperCreator.js';
import { AlbumResponse } from '../../../../resources/itunes-api/dtos/responses.dto.js';
import { AlbumDocument } from '../../../../resources/itunes-api/entities/album.entity.js';

@Module({
  providers: [
    {
      provide: ResponseMapperInjectedNames.UserResponseMapper,
      useClass: createResponseMapper<UserDocument, UserRes>(),
    },
    {
      provide: ResponseMapperInjectedNames.ArtistsResponseMapper,
      useClass: createResponseMapper<ArtistDocument, ArtistResponse>(),
    },
    {
      provide: ResponseMapperInjectedNames.AlbumResponseMapper,
      useClass: createResponseMapper<AlbumDocument, AlbumResponse>(),
    },
  ],
  exports: [
    ResponseMapperInjectedNames.UserResponseMapper,
    ResponseMapperInjectedNames.ArtistsResponseMapper,
  ],
})
export class ResponseMapperModule {}
