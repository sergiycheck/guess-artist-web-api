import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseEntity } from '../../../common/resources/common/base-entities.js';

@Schema({ timestamps: true, versionKey: false })
export class Album extends BaseEntity {
  @Prop({ required: true })
  wrapperType: string;

  @Prop({ required: true })
  collectionType: string;

  @Prop({ required: true })
  artistId: number;

  @Prop({ required: true })
  collectionId: number;

  @Prop({ required: true })
  amgArtistId: number;

  @Prop({ required: true })
  artistName: string;

  @Prop({ required: true })
  collectionName: string;

  @Prop({ required: true })
  collectionCensoredName: string;

  @Prop({ required: true })
  artistViewUrl: string;

  @Prop({ required: true })
  collectionViewUrl: string;

  @Prop({ required: true })
  artworkUrl60: string;

  @Prop({ required: true })
  artworkUrl100: string;

  @Prop({ required: true })
  collectionPrice: number;

  @Prop({ required: true })
  collectionExplicitness: string;

  @Prop({ required: true })
  trackCount: number;

  @Prop({ required: true })
  copyright: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  primaryGenreName: string;
}

export type AlbumDocument = Album & Document;

export const AlbumSchema = SchemaFactory.createForClass(Album);
