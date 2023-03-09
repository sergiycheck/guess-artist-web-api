import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

@Injectable()
export class MoralisQuickstartService implements OnModuleInit {
  private chain = EvmChain.ETHEREUM;
  private address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const apiKey = this.config.get('moralis.apiKey');
    await Moralis.start({
      apiKey,
      formatEvmAddress: 'checksum',
      formatEvmChainId: 'decimal',
      logLevel: 'debug',
    });
  }

  async getNativaBalances() {
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: this.address,
      chain: this.chain,
    });

    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether;

    return { native };
  }

  async getTokenBalances() {
    // Get token balances
    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: this.address,
      chain: this.chain,
    });

    // Format the balances to a readable output with the .display() method
    const tokens = tokenBalances.result.map((token) => token.display());

    return { tokens };
  }

  async getNftBalances() {
    // Get the nfts
    const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
      address: this.address,
      chain: this.chain,
      limit: 10,
    });

    // Format the output to return name, amount and metadata
    const nfts = nftsBalances.result.map((nft) => ({
      name: nft.result.name,
      amount: nft.result.amount,
      metadata: nft.result.metadata,
    })) as getNftBalancesType[];

    return { nfts };
  }
}
