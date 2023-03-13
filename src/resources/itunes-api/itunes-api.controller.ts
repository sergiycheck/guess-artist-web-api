import { ItunesApiService } from './itunes-api.service.js';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  PredefinedArtistsEnum,
  PredefinedArtistsSearchProps,
  SearchProps,
  TopCountry,
} from './dtos/search-dtos.dto.js';
import { AlbumDbService } from './album-db.service.js';

@ApiTags('itunes-api')
@Controller('itunes-api')
export class ItunesApiController {
  constructor(
    private readonly itunesService: ItunesApiService,
    private readonly albumDbService: AlbumDbService,
  ) {}

  @Get('search')
  search(@Query() dto: SearchProps) {
    return this.itunesService.search(dto);
  }

  @Get('albums-by-artist')
  @ApiQuery({ name: 'country', enum: TopCountry })
  async albumsByArtist(@Query() dto: SearchProps) {
    return this.itunesService.getAlbumsByArtist(dto);
  }

  @ApiQuery({ name: 'term', enum: PredefinedArtistsEnum })
  @Get('albums-by-predefined-artist')
  async albumsByPredefinedArtist(@Query() dto: PredefinedArtistsSearchProps) {
    return this.albumDbService.findAllAlbumsByArtist(dto);
  }

  @Post('populate-albums-by-artist')
  async populateAlbumsByArtist(@Body() dto: PredefinedArtistsSearchProps) {
    const res = await this.itunesService.getAlbumsByArtist({
      term: dto.term,
      country: 'US',
    });

    return this.albumDbService.checkIfExistsAndBatchCreate(res.results);
  }
}
