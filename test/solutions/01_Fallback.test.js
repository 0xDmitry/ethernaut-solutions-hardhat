const FallbackFactory = artifacts.require('FallbackFactory')
const Fallback = artifacts.require('Fallback')

const utils = require('../utils/TestUtils')

contract('Fallback', function ([player]) {
  let ethernaut
  let level

  beforeEach(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await FallbackFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Fallback, {
      from: player,
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
