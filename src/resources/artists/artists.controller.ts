import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artists.service.js';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('all')
  findAll() {
    return this.artistService.findAll();
  }
}
