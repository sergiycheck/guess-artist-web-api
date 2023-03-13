import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { NotEmptyPipe } from '../../common/pipes/not-empty.pipe.js';
import { CustomParseObjectIdPipe } from '../../common/pipes/custom-parse-objectid.pipe.js';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createMapped(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.finAllMapped();
  }

  @Get(':id')
  findOne(
    @Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe())
    id: string,
  ) {
    return this.userService.findOneMapped(id);
  }

  @Patch(':id')
  update(
    @Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe())
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateMapped(id, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe())
    id: string,
  ) {
    return this.userService.remove(id);
  }
}