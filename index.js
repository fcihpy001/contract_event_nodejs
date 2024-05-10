const {
  Contract,
  parseEther,
  formatEther,
  parseUnits,
  formatUnits
} = require('ethers')
const { ethers } = require('ethers')


/**
 * 定义provider
 * 定义合约地址
 * 定义abi接口
 * 构造合约对象
 * 调用合约对应abi方法
 * 监听合约事件
 */

const provider = new ethers.JsonRpcProvider(
  'https://sepolia.infura.io/v3/185ac6ce977d4a828c4d4445ce0cd770'
)

const contract_addr = '0x6deFd7e108708019E99fF84e6B2731D27d39be68'
const abi = [
  'event SumEvent(address indexed sender, uint256 num1, uint256 num2,uint256 sum)',
  'event Transfer(address indexed from, address indexed to, uint amount)'
]
const contract = new Contract(contract_addr, abi, provider)

contract.on('SumEvent', (sender, num1, numb2, sum) => {
  console.log(`sender: ${sender}, caculate: ${num1} + ${numb2} = ${sum}}`)
})

contract.on('Transfer', (from, to, amount) => {
  cconsole.log(`transfer amount :${from} => ${to}: ${amount}`)
})

// contract.on('*', (event) => {
//   console.log(event)
// })
// const filter = contract.filters.Transfer(
//   '0xa3d5f7081A50cD5211F7dfcE2f1574Bbe0f50948'
// )
// contract.on(filter, (from, to, amount, event) => {
//   console.log(`transfer event:${from} => ${to}: ${amount}`)
// })

const eth = parseEther('1.2')
console.log('eth:', eth)

console.log('wei_str', formatEther(eth))

const feePerGas = parseUnits('4.5', 'gwei')
console.log('gas:', feePerGas)

console.log('format_unit:', formatUnits(feePerGas, 'finney'))
