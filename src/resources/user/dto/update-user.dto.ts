import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';
import { IsPropObjectId } from '../../../common/resources/common/dtos-validations-constraints.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Validate(IsPropObjectId)
  id: string;
}
