import Web3 from 'web3';
import { STAKING_ABI } from '../abi/stakingabi.mjs';
import { urls, contracts } from '../constants.mjs';

const web3 = new Web3(new Web3.providers.WebsocketProvider(urls.WS_rpc));
const erc20TokenAddress = contracts.pmind;

async function checkValidators() {
  try {
    const validatorsData = web3.eth.abi.encodeFunctionCall({
      name: 'validators',
      type: 'function',
      inputs: [],
    }, []);

    const stakedAmountData = web3.eth.abi.encodeFunctionCall({
      name: 'stakedAmount',
      type: 'function',
      inputs: [],
    }, []);

    const validators = await web3.eth.call({
      to: contracts.staking,
      data: validatorsData,
    });

    const decodedValidators = web3.eth.abi.decodeParameter('address[]', validators);
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
    const combinedTable = [];

    for (const [index, validator] of decodedValidators.entries()) {
      const rewardBalance = await erc20TokenContract.methods.balanceOf(validator).call();
      const decodedRewardBalance = web3.utils.fromWei(rewardBalance, 'ether');

      combinedTable.push({
        'Validator Address': validator,
        'Reward Balance (PMIND)': decodedRewardBalance,
      });
    }

    console.log('Validators and Reward Balances:');
    console.table(combinedTable);

    const stakedAmount = await web3.eth.call({
      to: contracts.staking,
      data: stakedAmountData,
    });

    const decodedStakedAmountWei = web3.eth.abi.decodeParameter('uint256', stakedAmount);
    const decodedStakedAmountEther = web3.utils.fromWei(decodedStakedAmountWei, 'ether');

    console.log(`Total Staked Amount (MIND): ${decodedStakedAmountEther}`);

    
    setTimeout(() => {
      process.exit(0); 
    }, 5);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export default checkValidators;
