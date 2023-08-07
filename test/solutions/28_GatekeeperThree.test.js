const GatekeeperThreeFactory = artifacts.require('GatekeeperThreeFactory')
const GatekeeperThree = artifacts.require('GatekeeperThree')
const GatekeeperThreeAttack = artifacts.require('GatekeeperThreeAttack')

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

    const attacker = await GatekeeperThreeAttack.new({
      from: player,
    })
    await attacker.attack(instance.address, {
      from: player,
      value: 1000000000000001,
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
