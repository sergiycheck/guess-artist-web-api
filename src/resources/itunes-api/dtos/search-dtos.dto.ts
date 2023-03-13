import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

export enum TopCountry {
  CN = 'CN',
  IN = 'IN',
  US = 'US',
  ID = 'ID',
  PK = 'PK',
}

export class PredefinedArtistsSearchProps extends BaseSearchProps {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  term: 'The Beatles';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: 'US';
}
