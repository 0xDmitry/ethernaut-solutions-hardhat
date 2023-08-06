const ElevatorFactory = artifacts.require('ElevatorFactory')
const Elevator = artifacts.require('Elevator')
const ElevatorAttack = artifacts.require('ElevatorAttack')

const utils = require('../utils/TestUtils')

contract('Elevator', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await ElevatorFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Elevator)

    const attacker = await ElevatorAttack.new({
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
