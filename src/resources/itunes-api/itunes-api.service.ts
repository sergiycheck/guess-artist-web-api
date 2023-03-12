import { Injectable } from '@nestjs/common';

import got, { CancelableRequest, OptionsInit } from 'got';
import { URLSearchParams } from 'url';
import { SearchProps } from './dtos.dto.js';

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
    const result = await itunesClient.get(`${searchUrl}`).json();
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
    };

    return this.search(extendedProps);
  }

  async getFamousArtists() {
    return [
      {
        id: 1,
        name: 'The Beatles',
      },
      {
        id: 2,
        name: 'Jack Johnson',
      },
      {
        id: 3,
        name: 'Bob Dylan',
      },
      {
        id: 4,
        name: 'Eminem',
      },
      {
        id: 5,
        name: 'Taylor Swift',
      },
      {
        id: 6,
        name: 'Rihanna',
      },
      {
        id: 7,
        name: 'Katy Perry',
      },
      {
        id: 8,
        name: 'Justin Bieber',
      },
      {
        id: 9,
        name: 'Justin Bieber',
      },
      {
        id: 10,
        name: 'Queen',
      },
      {
        id: 11,
        name: 'AC/DC',
      },
    ];
  }
}
