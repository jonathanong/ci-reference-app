
const request = require('supertest')
const assert = require('assert')

const app = require('..')

const server = app.listen()

afterAll(() => server.close())

test('POST /api/v1/shas', async () => {
  const { body } = await request(server)
    .post('/api/v1/shas')
    .send({
      text: 'asdf'
    })
    .expect(200)

  assert(body)
  assert(/^[0-9a-z]+$/.test(body.sha))
})
