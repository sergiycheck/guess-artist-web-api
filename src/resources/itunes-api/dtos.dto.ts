import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class BaseSearchProps {
  [key: string]: string;
}

export class SearchProps extends BaseSearchProps {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  term: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;
}
