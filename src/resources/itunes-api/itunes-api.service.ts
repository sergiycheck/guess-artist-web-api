import { Injectable } from '@nestjs/common';

import got, { CancelableRequest, OptionsInit } from 'got';
import { URLSearchParams } from 'url';
import {
  albumItunesSchema,
  AlbumItunesType,
  ItunesResponse,
} from './dtos/itunes-responses.dto.js';
import {
  PredefinedArtistsSearchProps,
  SearchProps,
} from './dtos/search-dtos.dto.js';

const itunesUrls = {
  base: 'https://itunes.apple.com',
};

const options: OptionsInit = {
  prefixUrl: itunesUrls.base,
};

const itunesClient = got.extend(options);

@Injectable()
export class ItunesApiService {
  async search(props: SearchProps) {
    const searchUrl = `search?${new URLSearchParams(props).toString()}`;
    const result = (await itunesClient
      .get(`${searchUrl}`)
      .json()) as ItunesResponse<any>;
    return result;
  }

  async getAlbumsByArtist(props: SearchProps) {
    const extendedProps = {
      ...props,

      //movie, podcast, music, musicVideo,
      //audiobook, shortFilm, tvShow, software, ebook, all
      media: 'music',

      //musicArtist, musicTrack, album, musicVideo, mix, song.
      entity: 'album',

      limit: '50',
    };

    const result = await this.search(extendedProps);

    const parsedAlbums = result.results.filter((result) => {
      const parsed = albumItunesSchema.safeParse(result);
      return parsed.success;
    }) as AlbumItunesType[];

    return {
      resultCount: result.resultCount,
      results: parsedAlbums,
    };
  }
}
