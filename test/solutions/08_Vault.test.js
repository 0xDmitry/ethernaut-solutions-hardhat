const VaultFactory = artifacts.require('VaultFactory')
const Vault = artifacts.require('Vault')

const utils = require('../utils/TestUtils')

contract('Vault', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await VaultFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Vault)

    const password = await web3.eth.getStorageAt(instance.address, 1)
    await instance.unlock(password, {
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
