const MagicNumFactory = artifacts.require('MagicNumFactory')
const MagicNum = artifacts.require('MagicNum')
const MagicNumAttack = artifacts.require('MagicNumAttack')

const utils = require('../utils/TestUtils')

contract('MagicNum', function ([player]) {
  let ethernaut
  let level

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy()
    level = await MagicNumFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it('should submit level instance successfully', async function () {
    const instance = await utils.createLevelInstance(ethernaut, level.address, player, MagicNum, {
      from: player,
    })

    const solver = await MagicNumAttack.new({
      from: player,
    })
    instance.setSolver(solver.address, {
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
