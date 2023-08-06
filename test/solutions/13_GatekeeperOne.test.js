const GatekeeperOneFactory = artifacts.require('GatekeeperOneFactory')
const GatekeeperOne = artifacts.require('GatekeeperOne')
const GatekeeperOneAttack = artifacts.require('GatekeeperOneAttack')

const utils = require('../utils/TestUtils')

contract('GatekeeperOne', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await GatekeeperOneFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      GatekeeperOne,
    )

    const attacker = await GatekeeperOneAttack.new({
      from: player,
    })
    await attacker.attack(instance.address, {
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
