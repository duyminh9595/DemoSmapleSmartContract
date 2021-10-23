const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

provider = new HDWalletProvider(
  'network heavy loyal any when ready arena sketch ozone civil tray behave',
  'https://rinkeby.infura.io/v3/e9421360e8874a0e8f5687b89dca6ee0'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: [] })
      .send({ gas: '1000000', from: accounts[0],gasPrice: '5000000000' });
  
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  };
  deploy();