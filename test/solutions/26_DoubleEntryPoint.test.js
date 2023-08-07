const DoubleEntryPointFactory = artifacts.require('DoubleEntryPointFactory')
const DoubleEntryPoint = artifacts.require('DoubleEntryPoint')
const DoubleEntryPointAttack = artifacts.require('DoubleEntryPointAttack')
const Forta = artifacts.require('Forta')

const utils = require('../utils/TestUtils')

contract('DoubleEntryPoint', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await DoubleEntryPointFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      DoubleEntryPoint,
    )

    const fortaAddress = await instance.forta()
    const forta = await Forta.at(fortaAddress)
    const cryptoVaultAddress = await instance.cryptoVault()
    const attacker = await DoubleEntryPointAttack.new(fortaAddress, cryptoVaultAddress, {
      from: player,
    })
    await forta.setDetectionBot(attacker.address, {
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
