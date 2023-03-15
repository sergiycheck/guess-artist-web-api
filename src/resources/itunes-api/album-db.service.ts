import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EntityService } from '../../common/resources/common/base.service.js';
import {
  ResponseMapperInjectedNames,
  ResponseMapperType,
} from '../../common/resources/common/responseMapper/responseMapperCreator.js';
import { Album, AlbumDocument } from './entities/album.entity.js';
import { AlbumResponse } from './dtos/responses.dto.js';

import {
  AlbumItunesType,
  UpdateAlbumItutes,
} from './dtos/itunes-responses.dto.js';
import {
  PredefinedArtistsSearchProps,
  RandomAlbumsDto,
} from './dtos/search-dtos.dto.js';

@Injectable()
export class AlbumDbService extends EntityService<
  AlbumDocument,
  AlbumItunesType,
  UpdateAlbumItutes
> {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @Inject(ResponseMapperInjectedNames.ArtistsResponseMapper)
    public responseMapper: ResponseMapperType<AlbumDocument, AlbumResponse>,
  ) {
    super(albumModel);
  }

  async findAllAlbumsByArtist(dto: PredefinedArtistsSearchProps) {
    const count = await this.countOfDocsByArtist(dto);

    const results = await this.model
      .find({ artistName: { $regex: dto.term, $options: 'i' } })
      .exec();

    const data = results.map((o) =>
      this.responseMapper.mapResponse(o.toObject()),
    );

    return {
      count,
      data,
    };
  }

  countOfDocsByArtist(dto: PredefinedArtistsSearchProps) {
    return this.model.count({
      artistName: { $regex: dto.term, $options: 'i' },
    });
  }

  insertManyAlbums(dtos: AlbumItunesType[]) {
    return this.model.insertMany(dtos);
  }

  async getRandomSamplesFromAlbums(dto: RandomAlbumsDto) {
    const randomAlbums = (await this.model
      .aggregate([
        { $match: { artistName: dto.term } },
        { $sample: { size: dto.size } },
      ])
      .exec()) as unknown as AlbumDocument[];

    const data = randomAlbums.map((o) => this.responseMapper.mapResponse(o));

    return {
      count: data.length,
      data,
    };
  }

  async checkIfExistsAndInsertMany(dtos: AlbumItunesType[]) {
    const dtosToCreate: AlbumItunesType[] = [];

    for (let dto of dtos) {
      const existsByIds = await this.model.exists({
        artistId: dto.artistId,
        collectionId: dto.collectionId,
        amgArtistId: dto.amgArtistId,
      });

      if (existsByIds) continue;

      dtosToCreate.push(dto);
    }

    if (dtosToCreate.length) {
      const results = await this.insertManyAlbums(dtosToCreate);

      const data = results.map((o) =>
        this.responseMapper.mapResponse(o.toObject()),
      );

      return { data };
    }

    return { data: [] };
  }
}
