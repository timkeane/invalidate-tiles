process.env.CDN_URI = 'https://cdn/'
process.env.CDN_USER = 'user'
process.env.CDN_PASSWORD = 'password'
process.env.CDN_POST_DATA = '{"foo": "bar"}'
process.env.CDN_URL_PROP_NAME = 'urls'

const rest = require('node-rest-client')
jest.mock('node-rest-client')
const Client = rest.Client
let mockCdnData
let mockCdnResponse
Client.prototype.post = jest.fn()

const invalidate = require('../src/invalidate')
const mockResponse = require('./response.mock')

beforeEach(() => {
  mockResponse.reset()
  Client.mockReset()
  Client.prototype.post.mockReset()
  Client.prototype.post.mockImplementation((uri, request, callback) => {
    callback(mockCdnData, mockCdnResponse)
  })
})

test('invalidate 201', () => {
  expect.assertions(9)

  const urls = []

  mockCdnData = {message: 'success'}
  mockCdnResponse = {statusCode: 201}

  invalidate(urls, mockResponse)
  expect(Client).toHaveBeenCalledTimes(1)
  expect(Client.mock.calls[0][0].user).toBe('user')
  expect(Client.mock.calls[0][0].password).toBe('password')

  expect(Client.prototype.post).toHaveBeenCalledTimes(1)
  expect(Client.prototype.post.mock.calls[0][0]).toBe('https://cdn/')
  expect(Client.prototype.post.mock.calls[0][1].headers).toEqual({'Content-Type': 'application/json'})
  expect(Client.prototype.post.mock.calls[0][1].data).toEqual({foo: 'bar', urls: urls})

  expect(mockResponse.json).toHaveBeenCalledTimes(1)
  expect(mockResponse.json.mock.calls[0][0]).toBe(mockCdnData)
})

test('invalidate 400', () => {
  expect.assertions(11)

  const urls = []

  mockCdnData = {message: 'bad request'}
  mockCdnResponse = {statusCode: 400}

  invalidate(urls, mockResponse)
  expect(Client).toHaveBeenCalledTimes(1)
  expect(Client.mock.calls[0][0].user).toBe('user')
  expect(Client.mock.calls[0][0].password).toBe('password')

  expect(Client.prototype.post).toHaveBeenCalledTimes(1)
  expect(Client.prototype.post.mock.calls[0][0]).toBe('https://cdn/')
  expect(Client.prototype.post.mock.calls[0][1].headers).toEqual({'Content-Type': 'application/json'})
  expect(Client.prototype.post.mock.calls[0][1].data).toEqual({foo: 'bar', urls: urls})

  expect(mockResponse.status).toHaveBeenCalledTimes(1)
  expect(mockResponse.status.mock.calls[0][0]).toBe(400)

  expect(mockResponse.json).toHaveBeenCalledTimes(1)
  expect(mockResponse.json.mock.calls[0][0]).toBe(mockCdnData)
})

test('invalidate 401', () => {
  expect.assertions(11)

  const urls = []

  mockCdnData = null
  mockCdnResponse = {statusCode: 401, statusMessage: 'Unauthorized'}

  invalidate(urls, mockResponse)
  expect(Client).toHaveBeenCalledTimes(1)
  expect(Client.mock.calls[0][0].user).toBe('user')
  expect(Client.mock.calls[0][0].password).toBe('password')

  expect(Client.prototype.post).toHaveBeenCalledTimes(1)
  expect(Client.prototype.post.mock.calls[0][0]).toBe('https://cdn/')
  expect(Client.prototype.post.mock.calls[0][1].headers).toEqual({'Content-Type': 'application/json'})
  expect(Client.prototype.post.mock.calls[0][1].data).toEqual({foo: 'bar', urls: urls})

  expect(mockResponse.status).toHaveBeenCalledTimes(1)
  expect(mockResponse.status.mock.calls[0][0]).toBe(401)

  expect(mockResponse.json).toHaveBeenCalledTimes(1)
  expect(mockResponse.json.mock.calls[0][0]).toEqual({message: 'Unauthorized'})
})