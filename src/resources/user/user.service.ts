import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRes } from './dto/responses.dto.js';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User, UserDocument } from './entities/user.entity.js';

import {
  ResponseMapperInjectedNames,
  ResponseMapperType,
} from '../../common/resources/common/responseMapper/responseMapperCreator.js';

import { EntityService } from '../../common/resources/common/base.service.js';

@Injectable()
export class UserService extends EntityService<
  UserDocument,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectModel(User.name) public model: Model<UserDocument>,

    @Inject(ResponseMapperInjectedNames.UserResponseMapper)
    public responseMapper: ResponseMapperType<UserDocument, UserRes>,
  ) {
    super(model);
  }

  async createMapped(createDto: CreateUserDto) {
    const res = await this.create(createDto);
    const mappedRes = this.responseMapper.mapResponse(res.toObject());
    return mappedRes;
  }

  async finAllMapped() {
    const res = await this.findAll();
    const data = res.docs.map((o) =>
      this.responseMapper.mapResponse(o.toObject()),
    );

    return {
      count: res.count,
      data,
    };
  }

  async findOneMapped(id: string) {
    const entity = await this.findOne(id);

    return entity ? this.responseMapper.mapResponse(entity.toObject()) : null;
  }

  async updateMapped(id: string, updateDto: UpdateUserDto) {
    const updatedEntity = await this.update(id, updateDto);

    return this.responseMapper.mapResponse(updatedEntity.toObject());
  }
}
