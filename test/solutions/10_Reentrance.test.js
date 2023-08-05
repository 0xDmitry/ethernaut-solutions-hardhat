const ReentranceFactory = artifacts.require('ReentranceFactory')
const Reentrance = artifacts.require('Reentrance')

const utils = require('../utils/TestUtils')

contract('Reentrance', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await ReentranceFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const insertCoin = web3.utils.fromWei((await level.insertCoin.call()).toString(), 'ether')
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Reentrance, {
      from: player,
      value: web3.utils.toWei(insertCoin, 'ether'),
    })

    // INSERT YOUR SOLUTION HERE

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
