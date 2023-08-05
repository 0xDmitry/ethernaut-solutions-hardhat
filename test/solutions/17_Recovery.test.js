const RecoveryFactory = artifacts.require('RecoveryFactory')
const Recovery = artifacts.require('Recovery')

const utils = require('../utils/TestUtils')

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

    // INSERT YOUR SOLUTION HERE

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
