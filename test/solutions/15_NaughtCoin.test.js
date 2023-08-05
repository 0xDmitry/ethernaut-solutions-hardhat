const NaughtCoinFactory = artifacts.require('NaughtCoinFactory')
const NaughtCoin = artifacts.require('NaughtCoin')

const utils = require('../utils/TestUtils')

contract('NaughtCoin', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await NaughtCoinFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, NaughtCoin)

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
