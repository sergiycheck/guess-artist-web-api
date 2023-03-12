import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import pkg from 'mongoose';

@Injectable()
export class CustomConnectionService {
  constructor(@InjectConnection() private connection: pkg.Connection) {}

  getConnection() {
    return this.connection;
  }
}
