const DenialFactory = artifacts.require('DenialFactory')
const Denial = artifacts.require('Denial')
const DenialAttack = artifacts.require('DenialAttack')

const utils = require('../utils/TestUtils')

contract('Denial', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await DenialFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Denial, {
      from: player,
      value: web3.utils.toWei('0.001', 'ether'),
    })

    const attacker = await DenialAttack.new(instance.address, {
      from: player,
    })
    await instance.setWithdrawPartner(attacker.address, {
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
