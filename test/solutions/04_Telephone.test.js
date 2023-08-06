const TelephoneFactory = artifacts.require('TelephoneFactory')
const Telephone = artifacts.require('Telephone')
const TelephoneAttack = artifacts.require('TelephoneAttack')

const utils = require('../utils/TestUtils')

contract('Telephone', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await TelephoneFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Telephone)

    const attacker = await TelephoneAttack.new({
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
