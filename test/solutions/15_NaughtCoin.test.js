const NaughtCoinFactory = artifacts.require('NaughtCoinFactory')
const NaughtCoin = artifacts.require('NaughtCoin')

const utils = require('../utils/TestUtils')

contract('NaughtCoin', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await NaughtCoinFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, NaughtCoin)

    const balance = await instance.balanceOf(player, {
      from: player,
    })
    await instance.approve(player, balance, {
      from: player,
    })
    await instance.transferFrom(player, level.address, balance, {
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
