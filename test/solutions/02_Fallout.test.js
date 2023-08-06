const FalloutFactory = artifacts.require('FalloutFactory')
const Fallout = artifacts.require('Fallout')

const utils = require('../utils/TestUtils')

contract('Fallout', function ([player]) {
  let ethernaut
  let level

  beforeEach(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await FalloutFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Fallout, {
      from: player,
    })

    await instance.Fal1out({
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
