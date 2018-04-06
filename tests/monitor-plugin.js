
const { IncomingWebhook } = require('@slack/client')

const webhook = new IncomingWebhook('https://hooks.slack.com/services/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')

const {
  CIRCLE_BUILD_URL
} = process.env

module.exports = (runner) => {
  runner.events.on('monitor', ({
    monitorSetConfig,
    monitorConfig,
    success,
    results
  }) => {
    if (success) return

    // only slack the last attempt
    const result = results[results.length - 1]

    slackFailure(monitorSetConfig, monitorConfig, result)
  })
}

function slackFailure (monitorSetConfig, monitorConfig, result) {
  const title = `Monitor failed \`${monitorSetConfig.id}\`: \`${monitorConfig.id}\`\n`

  let body = ''
  if (CIRCLE_BUILD_URL) body += `See CircleCI build: ${CIRCLE_BUILD_URL}\n`
  if (result.logs.length) body += 'Logs:\n```\n' + result.logs.join('\n') + '\n```\n'
  if (result.error) body += 'Error:\n```\n' + String(result.error.stack || result.error.message || result.error).trim() + '\n```\n'

  const str = title + body
  webhook.send(str, onError)
}

function onError (err) {
  if (err) console.error(err.stack)
}
