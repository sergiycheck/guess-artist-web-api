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
    const urlParams = new URLSearchParams(props);
    const searchUrl = `search?${urlParams.toString()}`;

    const result = await itunesClient.get(`${searchUrl}`).json();

    return result;
  }
}
