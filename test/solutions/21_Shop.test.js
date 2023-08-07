const ShopFactory = artifacts.require('ShopFactory')
const Shop = artifacts.require('Shop')
const ShopAttack = artifacts.require('ShopAttack')

const utils = require('../utils/TestUtils')

contract('Shop', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await ShopFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Shop)

    const attacker = await ShopAttack.new({
      from: player,
    })
    await attacker.buy(instance.address, {
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
