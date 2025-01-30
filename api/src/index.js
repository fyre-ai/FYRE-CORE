import { Command } from 'commander';
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import inquirer from 'inquirer';
import { TokenService } from './tokenService.js';
import { WalletManager } from './wallet.js';
import { NETWORKS, DEFAULT_NETWORK } from './config.js';
import { table } from 'table';

const program = new Command();

program
  .name('token-bot')
  .description('Advanced CLI tool for creating and managing tokens on pump.fun')
  .version('1.0.0');

program
  .command('create-token')
  .description('Create a new token using information from tokens/info.json')
  .option('-n, --network <network>', 'Select network (mainnet, devnet, testnet)', 'devnet')
  .action(async (options) => {
    try {
      const network = NETWORKS[options.network] || DEFAULT_NETWORK;
      console.log(chalk.blue(`Using network: ${network.label}`));

      const walletManager = new WalletManager(network);
      const wallet = await walletManager.initializeWallet();
      
      // Display wallet info
      await walletManager.displayWalletInfo();

      // Check if wallet has enough SOL
      const balance = await walletManager.getBalance();
      if (balance < 0.5) {
        if (network.name !== 'mainnet-beta') {
          const { requestAirdrop } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'requestAirdrop',
              message: 'Wallet balance is low. Request an airdrop?',
              default: true
            }
          ]);

          if (requestAirdrop) {
            await walletManager.requestAirdrop(1);
            console.log(chalk.green('Airdrop successful!'));
          }
        } else {
          console.warn(chalk.yellow('Warning: Low wallet balance'));
        }
      }

      // Read and parse the JSON file
      const data = await readFile('./tokens/info.json', 'utf8');
      const tokenInfo = JSON.parse(data);

      // Validate required fields
      const requiredFields = ['name', 'ticker', 'description'];
      const missingFields = requiredFields.filter(field => !tokenInfo[field]);

      if (missingFields.length > 0) {
        console.error(chalk.red(`Error: Missing required fields: ${missingFields.join(', ')}`));
        process.exit(1);
      }

      // Create the token
      const tokenService = new TokenService(network);
      const result = await tokenService.createToken(tokenInfo);

      // Display success message with detailed information
      console.log(chalk.green('\nToken created successfully! ✨'));
      
      const tableData = [
        ['Field', 'Value'],
        ['Name', tokenInfo.name],
        ['Ticker', tokenInfo.ticker],
        ['Description', tokenInfo.description],
        ['Network', network.label],
        ['Creator Address', result.creatorAddress],
        ['Token Address', result.tokenAddress],
        ['Mint Address', result.mintAddress],
        ['Transaction Hash', result.txHash]
      ];

      console.log(table(tableData));

    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(chalk.red('Error: tokens/info.json file not found'));
      } else if (error instanceof SyntaxError) {
        console.error(chalk.red('Error: Invalid JSON format in tokens/info.json'));
      } else {
        console.error(chalk.red(`Error: ${error.message}`));
      }
      process.exit(1);
    }
  });

program
  .command('wallet')
  .description('Manage wallet')
  .option('-e, --export', 'Export wallet backup')
  .option('-n, --network <network>', 'Select network (mainnet, devnet, testnet)', 'devnet')
  .action(async (options) => {
    try {
      const network = NETWORKS[options.network] || DEFAULT_NETWORK;
      const walletManager = new WalletManager(network);

      if (options.export) {
        const { password } = await inquirer.prompt([
          {
            type: 'password',
            name: 'password',
            message: 'Enter password for wallet encryption:',
            mask: '*'
          }
        ]);

        const exportPath = await walletManager.exportWallet(password);
        console.log(chalk.green(`Wallet exported to: ${exportPath}`));
      } else {
        await walletManager.displayWalletInfo();
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('verify-token <tokenAddress>')
  .description('Verify token information')
  .option('-n, --network <network>', 'Select network (mainnet, devnet, testnet)', 'devnet')
  .action(async (tokenAddress, options) => {
    try {
      const network = NETWORKS[options.network] || DEFAULT_NETWORK;
      const tokenService = new TokenService(network);
      
      const result = await tokenService.verifyToken(tokenAddress);
      
      if (result.isValid) {
        console.log(chalk.green('\nToken Verification Successful! ✨'));
        
        const tableData = [
          ['Field', 'Value'],
          ['Mint Authority', result.mintAuthority],
          ['Total Supply', result.supply],
          ['Decimals', result.decimals.toString()],
          ['Name', result.metadata.name],
          ['Ticker', result.metadata.ticker],
          ['Creator', result.metadata.creator]
        ];

        console.log(table(tableData));

        // Get token balance for the current wallet
        const balance = await tokenService.getTokenBalance(tokenAddress);
        console.log(chalk.blue(`\nYour wallet balance: ${balance} ${result.metadata.ticker}`));
      } else {
        console.error(chalk.red(`Token verification failed: ${result.error}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();