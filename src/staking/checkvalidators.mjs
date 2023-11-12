import Web3 from 'web3';
import { STAKING_ABI } from '../abi/stakingabi.mjs';
import { urls, contracts } from '../constants.mjs';

const web3 = new Web3(new Web3.providers.WebsocketProvider(urls.WS_rpc));
const erc20TokenAddress = '0x75E218790B76654A5EdA1D0797B46cBC709136b0'; // Replace with the correct ERC20 token address

async function checkValidators() {
  try {
    // Create a data payload for the 'validators' function
    const data = web3.eth.abi.encodeFunctionCall({
      name: 'validators',
      type: 'function',
      inputs: [],
    }, []);

    // Make a call to the contract to get the validators
    const validators = await web3.eth.call({
      to: contracts.staking,
      data: data,
    });

    // Convert the result to an array of addresses
    const decodedValidators = web3.eth.abi.decodeParameter('address[]', validators);
    const validatorsTable = decodedValidators.map((address, index) => ({ 'Validator': address, 'Index': index + 1 }));

    console.log('List of Validators:');
    console.table(validatorsTable);

    const erc20TokenABI = [
      {
        constant: true,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
      },
    ];

    const erc20TokenContract = new web3.eth.Contract(erc20TokenABI, erc20TokenAddress);
    const rewardsTable = [];

    for (const validator of decodedValidators) {
      const rewardBalance = await erc20TokenContract.methods.balanceOf(validator).call();
      const decodedRewardBalance = web3.utils.fromWei(rewardBalance, 'ether');
      rewardsTable.push({ 'Validator': validator, 'Reward Balance (TOKEN)': decodedRewardBalance });
    }

    console.log('Reward Balances for Validators:');
    console.table(rewardsTable);

    // Create a data payload for the 'stakedAmount' function
    const stakedAmountData = web3.eth.abi.encodeFunctionCall({
      name: 'stakedAmount',
      type: 'function',
      inputs: [],
    }, []);

    // Make a call to the contract to get the total staked amount
    const stakedAmount = await web3.eth.call({
      to: contracts.staking,
      data: stakedAmountData,
    });

    // Convert the result to the total staked amount in MIND
    const decodedStakedAmountWei = web3.eth.abi.decodeParameter('uint256', stakedAmount);
    const decodedStakedAmountEther = web3.utils.fromWei(decodedStakedAmountWei, 'ether');

    console.log(`Total Staked Amount (MIND): ${decodedStakedAmountEther}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export default checkValidators;
