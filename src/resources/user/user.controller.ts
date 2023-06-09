import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service.js';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { NotEmptyPipe } from '../../common/pipes/not-empty.pipe.js';
import { CustomParseObjectIdPipe } from '../../common/pipes/custom-parse-objectid.pipe.js';

@ApiTags('users')
@Controller('users')
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

  @Get('top-3')
  findTop3() {
    return this.userService.findTop3Players();
  }

  @Get(':id')
  findOne(
    @Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe())
    id: string,
  ) {
    return this.userService.findOneMapped(id);
  }

  @Post('login')
  async findOneByUserName(@Body() dto: LoginUserDto) {
    const res = await this.userService.findOneByUserName(dto.name);
    if (!res) throw new BadRequestException(`No user with ${dto.name} name.`);
    return res;
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
