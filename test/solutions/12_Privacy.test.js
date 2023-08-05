const PrivacyFactory = artifacts.require('PrivacyFactory')
const Privacy = artifacts.require('Privacy')

const utils = require('../utils/TestUtils')

contract('Privacy', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await PrivacyFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Privacy, {
      from: player,
      value: web3.utils.toWei('1', 'ether'),
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
