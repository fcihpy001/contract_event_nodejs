const { Contract } = require('ethers')
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider(
  'https://sepolia.infura.io/v3/185ac6ce977d4a828c4d4445ce0cd770'
)

const contract_addr = '0x6deFd7e108708019E99fF84e6B2731D27d39be68'
const abi = [
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function totalSupply() external view returns (uint256)',
  'function name() external view returns (string)',
  'function balanceOf(address account) external view returns (uint256)',
  'function transfer(address to, uint256 value) external returns (bool)'
]
const contract = new Contract(contract_addr, abi, provider)

contract.on(contract.filters.Transfer, (event, from, to, value) => {
  //   console.log(`${from} sent ${formatEther(value)} to ${to}`)
  console.log(from)
  console.log(to)
  console.log(value)
  console.log(event)
})

const receiver = '0xa3d5f7081A50cD5211F7dfcE2f1574Bbe0f50948'

// async function main() {
//   const block_number = await provider.getBlockNumber()
//   console.log('blocknumber:', block_number)

//   const balance = await contract.balanceOf(receiver)
//   console.log('balance: ', balance)

//   const name = await contract.name()
//   console.log('name', name)
// }

// main()
