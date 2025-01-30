import { clusterApiUrl } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

export const NETWORKS = {
  mainnet: {
    name: 'mainnet-beta',
    url: process.env.MAINNET_URL || clusterApiUrl('mainnet-beta'),
    label: 'Mainnet',
  },
  devnet: {
    name: 'devnet',
    url: process.env.DEVNET_URL || clusterApiUrl('devnet'),
    label: 'Devnet',
  },
  testnet: {
    name: 'testnet',
    url: process.env.TESTNET_URL || clusterApiUrl('testnet'),
    label: 'Testnet',
  },
};

export const DEFAULT_NETWORK = NETWORKS.devnet;

export const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

export const TOKEN_METADATA = {
  decimals: 9,
  freezeAuthority: false,
  initialSupply: 1000000000,
};

export const API_ENDPOINTS = {
  tokenCreation: 'https://api.pump.fun/create-token',
  tokenVerification: 'https://api.pump.fun/verify-token',
  tokenMetadata: 'https://api.pump.fun/token-metadata',
};