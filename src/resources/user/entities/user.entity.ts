import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseEntity } from '../../../common/resources/common/base-entities.js';

@Schema({ timestamps: true, versionKey: false })
export class User extends BaseEntity {
  @Prop({ required: true, maxlength: 20, index: true })
  name: string;

  @Prop({ required: true, maxlength: 100 })
  points: number;
}

export type UserDocument = User & Document;

export const UsersSchema = SchemaFactory.createForClass(User);
UsersSchema.index({ name: 1 });
