const PreservationFactory = artifacts.require('PreservationFactory')
const Preservation = artifacts.require('Preservation')
const PreservationAttack = artifacts.require('PreservationAttack')

const utils = require('../utils/TestUtils')

contract('Preservation', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await PreservationFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Preservation)

    const attacker = await PreservationAttack.new({
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
