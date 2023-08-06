const KingFactory = artifacts.require('KingFactory')
const King = artifacts.require('King')
const KingAttack = artifacts.require('KingAttack')

const utils = require('../utils/TestUtils')

contract('King', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await KingFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, King, {
      from: player,
      value: web3.utils.toWei('0.001', 'ether'),
    })

    const attacker = await KingAttack.new(instance.address, {
      from: player,
    })
    const prize = await instance.prize()
    await attacker.attack({
      from: player,
      value: prize,
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
