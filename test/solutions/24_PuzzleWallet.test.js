const PuzzleWalletFactory = artifacts.require('PuzzleWalletFactory')
const PuzzleWallet = artifacts.require('PuzzleWallet')

const utils = require('../utils/TestUtils')

contract('PuzzleWallet', function ([player]) {
  let ethernaut
  let level

  beforeEach(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await PuzzleWalletFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      PuzzleWallet,
      { from: player, value: web3.utils.toWei('0.001', 'ether') },
    )

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
