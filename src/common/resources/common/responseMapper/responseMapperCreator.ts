import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';

export const ResponseMapperInjectedNames = {
  UserResponseMapper: 'UserResponseMapper',
  ArtistsResponseMapper: 'ArtistsResponseMapper',
};

export type ResponseMapperType<TClassDoc extends Document, TClassRes> = {
  mapResponse(entity: TClassDoc): TClassRes;
};

export function createResponseMapper<
  TClassDoc extends Document,
  TClassRes,
>(): any {
  @Injectable()
  class ResponseMapper {
    public mapResponse(entity: TClassDoc & { _id: string }): TClassRes {
      const { _id, ...data } = entity;

      const mapped = {
        id: _id,
        ...data,
      } as unknown as TClassRes;

      return mapped;
    }
  }

  return ResponseMapper;
}
