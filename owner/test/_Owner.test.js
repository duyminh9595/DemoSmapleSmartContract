const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');
//old solc version
// const { interface, bytecode } = require('../compile');

let accounts;
let _owner;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();

    _owner = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Owner', () => {
    it('deploys a contract success', () => {
        assert.ok(_owner.options.address);
    });

    it('check the owner is the person create contract', async () => {
        const owner = await _owner.methods.getOwner().call();
        //account[0] is the account create
        assert.equal(owner, accounts[0]);
    });

    //change the owner to account[1]
    it('can change the owner', async () => {
        await _owner.methods.changeOwner(accounts[1]).send({ from: accounts[0] });
        const ownerChanged = await _owner.methods.getOwner().call();
        assert.equal(accounts[1], ownerChanged);
    });
});