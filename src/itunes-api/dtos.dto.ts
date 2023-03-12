import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchProps {
  [key: string]: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  term: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;
}
