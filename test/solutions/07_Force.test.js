const ForceFactory = artifacts.require('ForceFactory')
const Force = artifacts.require('Force')
const ForceAttack = artifacts.require('ForceAttack')

const utils = require('../utils/TestUtils')

contract('Force', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await ForceFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Force)

    const attacker = await ForceAttack.new({
      from: player,
    })
    await attacker.attack(instance.address, {
      from: player,
      value: 1,
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
