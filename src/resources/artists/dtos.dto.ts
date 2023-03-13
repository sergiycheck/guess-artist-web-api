import { CommonResponse } from './../../common/resources/common/common-response.js';

export type ArtistResponse = CommonResponse & {
  id: string;
  name: string;
};
