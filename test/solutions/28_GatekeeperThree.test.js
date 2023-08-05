const GatekeeperThreeFactory = artifacts.require('GatekeeperThreeFactory')
const GatekeeperThree = artifacts.require('GatekeeperThree')

const utils = require('../utils/TestUtils')

contract('GatekeeperThree', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await GatekeeperThreeFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      GatekeeperThree,
    )

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
