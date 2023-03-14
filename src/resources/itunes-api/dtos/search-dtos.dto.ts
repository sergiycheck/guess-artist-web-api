import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

class BaseSearchProps {
  [key: string]: string;
}

export enum TopCountry {
  CN = 'CN',
  IN = 'IN',
  US = 'US',
  ID = 'ID',
  PK = 'PK',
}

export class SearchProps extends BaseSearchProps {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  term: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: 'US';

  @ApiProperty()
  @IsOptional()
  @IsString()
  limit? = '50';
}

export enum PredefinedArtistsEnum {
  ['The Beatles'] = 'The Beatles',

  ['Jack Johnson'] = 'Jack Johnson',

  ['Bob Dylan'] = 'Bob Dylan',

  ['Eminem'] = 'Eminem',

  ['Taylor Swift'] = 'Taylor Swift',

  ['Rihanna'] = 'Rihanna',

  ['Katy Perry'] = 'Katy Perry',

  ['Justin Bieber'] = 'Justin Bieber',

  ['Queen'] = 'Queen',
  ['AC/DC'] = 'AC/DC',
}

export class PredefinedArtistsSearchProps {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  term: string;
}

export class RandomAlbumsDto extends PredefinedArtistsSearchProps {
  @ApiProperty()
  @IsNumber()
  size: number;
}
