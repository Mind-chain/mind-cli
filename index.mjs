import { Command } from 'commander';
import stakeCommand from './src/staking/validator-stake.mjs';
import unstakeCommand from './src/staking/unstake.mjs';
import checkValidatorsCommand from './src/staking/checkvalidators.mjs';

const program = new Command();

program
  .version('1.0.0')
  .description('Mind  CLI');

program
  .command('stake')
  .description('Stake mind')
  .option('-p, --privatekey <privatekey>', 'User private key value')
  .action((options) => {
    const privateKey = options.privatekey;

    if (!privateKey) {
      console.error('Please provide a private key value.');
      return;
    }

    stakeCommand(privateKey);
  });
  program 
  .command("unstake")
  .description("Unstake Mind")
  .option("-p, --privatekey <privatekey>', 'User private key value")
  .action((options) => {
    const privateKey = options.privatekey;

    if (!privateKey) {
      console.error('Please provide a private key value.');
      return;
    }

    unstakeCommand(privateKey);
  });
  program
  .command('check-validators')
  .description('Check validators and total MIND staked')
  .action(() => {
    checkValidatorsCommand();
  });
program.parse(process.argv);
