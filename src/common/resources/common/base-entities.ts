import mongoose from 'mongoose';
import { Expose } from 'class-transformer';

export class BaseEntity {
  constructor(attrs: any) {
    Object.assign(this, attrs);
  }

  @Expose({ name: 'id' })
  public _id?: mongoose.Types.ObjectId;
}

export const EntitiesDocumentNames = {
  User: 'User',
  Artist: 'Artist',
  Album: 'Album',
};
