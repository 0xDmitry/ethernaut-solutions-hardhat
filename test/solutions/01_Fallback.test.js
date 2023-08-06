const FallbackFactory = artifacts.require('FallbackFactory')
const Fallback = artifacts.require('Fallback')

const utils = require('../utils/TestUtils')

contract('Fallback', function ([player]) {
  let ethernaut
  let level

  beforeEach(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await FallbackFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Fallback, {
      from: player,
    })

    await instance.contribute({
      from: player,
      value: 1,
    })
    await web3.eth.sendTransaction({
      from: player,
      to: instance.address,
      value: 1,
    })
    await instance.withdraw({ from: player })

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
