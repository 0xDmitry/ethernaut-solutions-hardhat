const AlienCodexFactory = artifacts.require('AlienCodexFactory')
const AlienCodex = artifacts.require('AlienCodex')

const utils = require('../utils/TestUtils')

contract('AlienCodex', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await AlienCodexFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, AlienCodex, {
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
