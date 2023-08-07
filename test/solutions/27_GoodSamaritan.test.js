const GoodSamaritanFactory = artifacts.require('GoodSamaritanFactory')
const GoodSamaritan = artifacts.require('GoodSamaritan')
const GoodSamaritanAttack = artifacts.require('GoodSamaritanAttack')

const utils = require('../utils/TestUtils')

contract('GoodSamaritan', function ([player]) {
  let ethernaut
  let level

  beforeEach(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await GoodSamaritanFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      GoodSamaritan,
      {
        from: player,
      },
    )

    const attacker = await GoodSamaritanAttack.new({
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
