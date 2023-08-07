const ReentranceFactory = artifacts.require('ReentranceFactory')
const Reentrance = artifacts.require('Reentrance')
const ReentranceAttack = artifacts.require('ReentranceAttack')

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
    const insertCoin = web3.utils.fromWei((await level.insertCoin()).toString(), 'ether')
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Reentrance, {
      from: player,
      value: web3.utils.toWei(insertCoin, 'ether'),
    })

    const attacker = await ReentranceAttack.new(instance.address, {
      from: player,
    })
    const balance = await web3.eth.getBalance(instance.address)
    await attacker.attack({
      from: player,
      value: balance,
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
