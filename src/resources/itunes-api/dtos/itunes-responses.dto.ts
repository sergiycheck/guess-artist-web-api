import z from 'zod';

export type ItunesResponse<T> = {
  resultCount: number;
  resulsts: Array<T>;
};

export const albumItunesSchema = z.object({
  wrapperType: z.string(),
  collectionType: z.string(),
  artistId: z.number(),
  collectionId: z.number(),
  amgArtistId: z.number(),
  artistName: z.string(),
  collectionName: z.string(),
  collectionCensoredName: z.string(),
  artistViewUrl: z.string().url(),
  collectionViewUrl: z.string().url(),
  artworkUrl60: z.string().url(),
  artworkUrl100: z.string().url(),
  collectionPrice: z.number(),
  collectionExplicitness: z.string(),
  trackCount: z.number(),
  copyright: z.string(),
  country: z.string(),
  currency: z.string(),
  releaseDate: z.string().datetime(),
  primaryGenreName: z.string(),
});

export type AlbumItunesType = z.infer<typeof albumItunesSchema>;
