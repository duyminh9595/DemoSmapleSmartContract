import web3 from "./web3";

const address = "0x5339240D4D0e3A830A794dB9892016D2e775d723";
const abi=[
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [ [Object], [Object] ],
    name: 'OwnerSet',
    type: 'event'
  },
  {
    inputs: [ {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getOwner',
    // outputs: [ [Object] ],
    outputs: [ { name: "", type: "address" } ],
    stateMutability: 'view',
    type: 'function'
  }
]
export default new web3.eth.Contract(abi, address);