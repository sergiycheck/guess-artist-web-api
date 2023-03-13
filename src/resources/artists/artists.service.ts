import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './artist.schema.js';
import { EntityService } from '../../common/resources/common/base.service.js';
import {
  ResponseMapperInjectedNames,
  ResponseMapperType,
} from '../../common/resources/common/responseMapper/responseMapperCreator.js';
import { ArtistResponse } from './dtos.dto.js';

@Injectable()
export class ArtistService extends EntityService<
  ArtistDocument,
  {},
  { id: string }
> {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @Inject(ResponseMapperInjectedNames.UserResponseMapper)
    public responseMapper: ResponseMapperType<ArtistDocument, ArtistResponse>,
  ) {
    super(artistModel);
  }

  async findAllMapped() {
    const all = await super.findAll();

    const data = all.docs.map((o) =>
      this.responseMapper.mapResponse(o.toObject()),
    );

    return {
      count: all.count,
      data,
    };
  }
}
