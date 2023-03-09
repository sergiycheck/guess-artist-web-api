import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoralisQuickstartService } from './moralis-quickstart.service';

@ApiTags('MoralisQuickstartController')
@Controller('moralis-quickstart')
export class MoralisQuickstartController {
  constructor(
    private readonly moralistQuickStartService: MoralisQuickstartService,
  ) {}

  @Get('native-balances')
  getDemoData() {
    return this.moralistQuickStartService.getNativaBalances();
  }

  @Get('token-balances')
  getTokenBalances() {
    return this.moralistQuickStartService.getTokenBalances();
  }

  @Get('nft-balances')
  getNftBalances() {
    return this.moralistQuickStartService.getNftBalances();
  }
}
