
const { By, until } = require('selenium-webdriver')
const Input = require('selenium-webdriver/lib/input')

const { domain } = require('../config')

exports.description = `
Submit text to the form.
`

exports.options = {}
exports.parameters = [{
  domain
}]

exports.test = ({
  driver,
  step,
  parameters
}) => {
  // const { domain } = parameters

  step('Visit the page.', async () => {
    await driver.get(domain)
  }, {
    timeout: '5s'
  })

  step('Submit text.', async () => {
    const input = await driver.wait(until.elementLocated(By.css('input')))
    // const input = await driver.wait(driver.findElement(By.css('input')))
    await input.sendKeys('asdf')
    await input.sendKeys(Input.Key.RETURN)

    // const button = await driver.wait(until.elementLocated(By.css('button')))
    // button.click()
  }, {
    timeout: '1s'
  })

  step('Expect a result.', async () => {
    await driver.wait(until.elementLocated(By.css('table tbody tr')))
  }, {
    timeout: '1s'
  })
}
