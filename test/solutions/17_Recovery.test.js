const RecoveryFactory = artifacts.require('RecoveryFactory')
const Recovery = artifacts.require('Recovery')
const RecoverySimpleToken = artifacts.require('./levels/RecoverySimpleToken.sol')

const utils = require('../utils/TestUtils')
const rlp = require('rlp')

const generateCreatedAddress = function (creatorAddress, nonce) {
  const bufferAddress = Buffer.from(creatorAddress.slice(2), 'hex')
  const data = rlp.encode([bufferAddress, nonce])
  return '0x' + web3.utils.sha3(data).slice(26)
}

contract('Recovery', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await RecoveryFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Recovery, {
      from: player,
      value: web3.utils.toWei('0.001', 'ether'),
    })

    const tokenAddress = generateCreatedAddress(instance.address, 1)
    const token = await RecoverySimpleToken.at(tokenAddress)
    await token.destroy(player, {
      from: player,
    })

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
