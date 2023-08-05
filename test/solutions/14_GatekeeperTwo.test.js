const GatekeeperTwoFactory = artifacts.require('GatekeeperTwoFactory')
const GatekeeperTwo = artifacts.require('GatekeeperTwo')

const utils = require('../utils/TestUtils')

contract('GatekeeperTwo', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await GatekeeperTwoFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      GatekeeperTwo,
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
