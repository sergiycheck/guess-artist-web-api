import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../common/resources/common/base-entities.js';

@Schema({ timestamps: true, versionKey: false })
export class Artist extends BaseEntity {
  @Prop({ required: true, maxlength: 100 })
  name: string;
}

export type ArtistDocument = Artist & Document;

export const ArtistSchema = SchemaFactory.createForClass(Artist);
