const DoubleEntryPointFactory = artifacts.require('DoubleEntryPointFactory')
const DoubleEntryPoint = artifacts.require('DoubleEntryPoint')

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
