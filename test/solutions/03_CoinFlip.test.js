const CoinFlipFactory = artifacts.require('CoinFlipFactory')
const CoinFlip = artifacts.require('CoinFlip')

const utils = require('../utils/TestUtils')

contract('CoinFlip', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await CoinFlipFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, CoinFlip)

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
