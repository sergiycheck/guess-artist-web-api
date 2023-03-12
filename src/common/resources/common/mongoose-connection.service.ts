import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import pkg from 'mongoose';
const { Connection } = pkg;

@Injectable()
export class CustomConnectionService {
  constructor(@InjectConnection() private connection: typeof Connection) {}

  getConnection() {
    return this.connection;
  }
}
