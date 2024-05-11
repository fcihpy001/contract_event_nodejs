const { Contract, Wallet, errors } = require('ethers')
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

// contract.on(contract.filters.Transfer, (event, from, to, value) => {
//   //   console.log(`${from} sent ${formatEther(value)} to ${to}`)
//   console.log(from)
//   console.log(to)
//   console.log(value)
//   console.log(event)
// })

const receiver = '0xa3d5f7081A50cD5211F7dfcE2f1574Bbe0f50948'

// async function main() {

// }

// main()

async function get_info() {
  const block_number = await provider.getBlockNumber()
  console.log('blocknumber:', block_number)

  const balance = await contract.balanceOf(receiver)
  const amount = ethers.utils.formatUnits(balance, 18)
  console.log('balance: ', amount)

  const name = await contract.name()
  console.log('name', name)
}

async function convert_eth_wei() {
  const balance = await provider.getBalance(receiver)
  const amount = ethers.utils.formatEther(balance)

  console.log('balance: ', amount)

  const amount2 = ethers.utils.parseEther('1.8')
  console.log('wei:', amount2)
  console.log('wei2eth:', ethers.utils.formatEther(amount2))
}

const prvite_key =
  'c41e8ee5b9588dd95d9eb955f50f174b2db36b6fcb1707f736cc53e2827ce7a6'
const from_addr = '0x96e3C57AEc80A2DEA822c38BFfA52493Aae626Ee'

async function send_contract_eth() {
  const wallet = new ethers.Wallet(prvite_key, provider)
  console.log('addr:', wallet.address)

  const gas = await provider.getGasPrice()
  const nonce = await provider.getTransactionCount(wallet.address)
  const transfer_amount = ethers.utils.parseEther('1.4')

  const wbtc_contract = new ethers.Contract(contract_addr, abi, wallet)

  const resp = await wbtc_contract.transfer(receiver, transfer_amount)
  console.log('tx_hash', resp.hash)
}

async function send_eth() {
  // 通过私钥转换成钱包地址，然后发起交易
  const wallet = new ethers.Wallet(prvite_key, provider)
  console.log('addr:', wallet.address)

  const gasPrice = await provider.getGasPrice()
  const nonce = await provider.getTransactionCount(wallet.address)
  const transfer_amount = ethers.utils.parseEther('0.002')

  const tx_obj = {
    to: receiver,
    gasPrice,
    value: transfer_amount
  }
  const reciept = await wallet.sendTransaction(tx_obj)
  await reciept.wait()
  console.log(reciept.hash)
}

// get_info()

// convert_eth_wei()

send_eth()
