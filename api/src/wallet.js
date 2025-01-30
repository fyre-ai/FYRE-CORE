import { Keypair, LAMPORTS_PER_SOL, Connection, PublicKey } from '@solana/web3.js';
import { readFile, writeFile } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import qrcode from 'qrcode-terminal';
import { NETWORKS, DEFAULT_NETWORK } from './config.js';

export class WalletManager {
  constructor(network = DEFAULT_NETWORK) {
    this.walletPath = './.wallet/keypair.json';
    this.network = network;
    this.connection = new Connection(network.url);
  }

  async initializeWallet() {
    try {
      const wallet = await this.loadWallet();
      return wallet;
    } catch {
      return await this.createNewWallet();
    }
  }

  async createNewWallet() {
    const keypair = Keypair.generate();
    const walletData = {
      publicKey: keypair.publicKey.toString(),
      secretKey: Array.from(keypair.secretKey),
      network: this.network.name,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };

    await this.ensureWalletDirectory();
    await writeFile(this.walletPath, JSON.stringify(walletData, null, 2), 'utf8');
    return keypair;
  }

  async loadWallet() {
    const data = await readFile(this.walletPath, 'utf8');
    const walletData = JSON.parse(data);
    
    // Update last used timestamp
    walletData.lastUsed = new Date().toISOString();
    await writeFile(this.walletPath, JSON.stringify(walletData, null, 2), 'utf8');
    
    return Keypair.fromSecretKey(Uint8Array.from(walletData.secretKey));
  }

  async ensureWalletDirectory() {
    const dir = path.dirname(this.walletPath);
    try {
      await import('fs/promises').then(fs => fs.mkdir(dir, { recursive: true }));
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }
  }

  async getWallet() {
    return await this.loadWallet();
  }

  async getBalance() {
    const wallet = await this.getWallet();
    const balance = await this.connection.getBalance(wallet.publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  async requestAirdrop(amount = 1) {
    if (this.network.name === 'mainnet-beta') {
      throw new Error('Airdrop not available on mainnet');
    }

    const wallet = await this.getWallet();
    const signature = await this.connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    await this.connection.confirmTransaction(signature);
    return signature;
  }

  async displayWalletInfo() {
    const wallet = await this.getWallet();
    const balance = await this.getBalance();
    const address = wallet.publicKey.toString();

    console.log('\nWallet Information:');
    console.log('------------------');
    console.log(`Network: ${this.network.label}`);
    console.log(`Address: ${address}`);
    console.log(`Balance: ${balance} SOL`);
    
    // Generate QR code for the wallet address
    qrcode.generate(address, { small: true });
  }

  getAddressHash() {
    const wallet = this.getWallet();
    return createHash('sha256')
      .update(wallet.publicKey.toString())
      .digest('hex')
      .slice(0, 8);
  }

  async exportWallet(password) {
    const wallet = await this.getWallet();
    const encrypted = await this.encryptWallet(wallet, password);
    const exportPath = `./.wallet/backup-${this.getAddressHash()}.enc`;
    await writeFile(exportPath, encrypted, 'utf8');
    return exportPath;
  }

  async encryptWallet(wallet, password) {
    // Implementation of wallet encryption
    // This is a placeholder - in production, use proper encryption
    const data = {
      publicKey: wallet.publicKey.toString(),
      secretKey: Array.from(wallet.secretKey)
    };
    return JSON.stringify(data);
  }
}