const Hapi = require('hapi')
const Boom = require('boom')
const fetch = require('node-fetch')
const redis = require('redis')
const conf = require('./conf')
const RedisCache = require('./redis-cache')
const {fetchItem} = require('./api')

const server = new Hapi.Server({port: conf.server.port, host: conf.server.host, routes: {cors: true}})
const redisCache = new RedisCache(redis, conf.redis.host, conf.redis.port)

server.route({
  method: 'GET',
  path: '/items/{itemName}',
  handler: request => {
    const item = fetchItem(fetch, redisCache, request.params.itemName)
    if (item === null) {
      throw Boom.notFound('Cannot find the requested item')
    }
    return item
  }
})

server.start(err => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${conf.server.port}`)
})
