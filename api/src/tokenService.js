import axios from 'axios';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID, MintLayout } from '@solana/spl-token';
import { WalletManager } from './wallet.js';
import { NETWORKS, TOKEN_METADATA, API_ENDPOINTS } from './config.js';
import ora from 'ora';

export class TokenService {
  constructor(network = NETWORKS.devnet) {
    this.network = network;
    this.connection = new Connection(network.url);
    this.walletManager = new WalletManager(network);
  }

  async createToken(tokenInfo) {
    const spinner = ora('Initializing token creation...').start();
    try {
      const wallet = await this.walletManager.initializeWallet();
      
      spinner.text = 'Creating token mint account...';
      const mintAccount = await this.createMintAccount(wallet);
      
      spinner.text = 'Initializing token...';
      const token = await this.initializeToken(mintAccount, wallet, tokenInfo);
      
      spinner.text = 'Registering token on pump.fun...';
      const response = await this.registerTokenOnPlatform(token, tokenInfo, wallet);
      
      spinner.succeed('Token created successfully!');
      
      return {
        success: true,
        mintAddress: mintAccount.publicKey.toString(),
        txHash: response.transactionHash,
        tokenAddress: response.tokenAddress,
        creatorAddress: wallet.publicKey.toString(),
        network: this.network.name
      };
    } catch (error) {
      spinner.fail(`Token creation failed: ${error.message}`);
      throw error;
    }
  }

  async createMintAccount(wallet) {
    const mintAccount = Token.createMint(
      this.connection,
      wallet,
      wallet.publicKey,
      TOKEN_METADATA.freezeAuthority ? wallet.publicKey : null,
      TOKEN_METADATA.decimals,
      TOKEN_PROGRAM_ID
    );
    return mintAccount;
  }

  async initializeToken(mintAccount, wallet, tokenInfo) {
    const token = new Token(
      this.connection,
      mintAccount.publicKey,
      TOKEN_PROGRAM_ID,
      wallet
    );

    // Create associated token account
    const associatedTokenAccount = await token.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    );

    // Mint initial supply
    await token.mintTo(
      associatedTokenAccount.address,
      wallet,
      [],
      TOKEN_METADATA.initialSupply * Math.pow(10, TOKEN_METADATA.decimals)
    );

    return token;
  }

  async registerTokenOnPlatform(token, tokenInfo, wallet) {
    const response = await axios.post(API_ENDPOINTS.tokenCreation, {
      name: tokenInfo.name,
      ticker: tokenInfo.ticker,
      description: tokenInfo.description,
      creator: wallet.publicKey.toString(),
      mintAddress: token.publicKey.toString(),
      network: this.network.name,
      metadata: {
        decimals: TOKEN_METADATA.decimals,
        initialSupply: TOKEN_METADATA.initialSupply,
        freezeAuthority: TOKEN_METADATA.freezeAuthority
      }
    });

    return response.data;
  }

  async verifyToken(tokenAddress) {
    try {
      const publicKey = new PublicKey(tokenAddress);
      const accountInfo = await this.connection.getAccountInfo(publicKey);
      
      if (!accountInfo) {
        throw new Error('Token not found');
      }

      const mintInfo = MintLayout.decode(accountInfo.data);
      const response = await axios.get(
        `${API_ENDPOINTS.tokenMetadata}/${tokenAddress}`
      );

      return {
        isValid: true,
        mintAuthority: mintInfo.mintAuthority.toString(),
        supply: mintInfo.supply.toString(),
        decimals: mintInfo.decimals,
        metadata: response.data
      };
    } catch (error) {
      return {
        isValid: false,
        error: error.message
      };
    }
  }

  async getTokenBalance(tokenAddress) {
    const wallet = await this.walletManager.getWallet();
    const token = new Token(
      this.connection,
      new PublicKey(tokenAddress),
      TOKEN_PROGRAM_ID,
      wallet
    );

    const account = await token.getOrCreateAssociatedAccountInfo(wallet.publicKey);
    const balance = await token.getAccountInfo(account.address);
    
    return balance.amount.toNumber() / Math.pow(10, balance.decimals);
  }
}