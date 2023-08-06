const CoinFlipFactory = artifacts.require('CoinFlipFactory')
const CoinFlip = artifacts.require('CoinFlip')
const CoinFlipAttack = artifacts.require('CoinFlipAttack')

const utils = require('../utils/TestUtils')

contract('CoinFlip', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await CoinFlipFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, CoinFlip)

    const attacker = await CoinFlipAttack.new({
      from: player,
    })
    for (let i = 0; i < 10; i++) {
      await attacker.attack(instance.address, {
        from: player,
      })
    }

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
