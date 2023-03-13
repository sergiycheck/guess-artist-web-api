import { CommonResponse } from '../../../common/resources/common/common-response.js';
import { AlbumItunesType } from './itunes-responses.dto.js';

export type AlbumResponse = CommonResponse &
  AlbumItunesType & {
    id: string;
  };
