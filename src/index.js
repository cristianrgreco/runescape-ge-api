const Hapi = require('hapi')
const fetch = require('node-fetch')
const redis = require('redis')
const conf = require('./conf')
const RedisCache = require('./redis-cache')
const {fetchItem} = require('./api')

const server = new Hapi.Server({port: conf.server.port, host: conf.server.host})
const redisCache = new RedisCache(redis, conf.redis.host, conf.redis.port)

server.route({
  method: 'GET',
  path: '/items/{itemName}',
  handler: request => fetchItem(fetch, redisCache, request.params.itemName)
})

server.start(err => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${conf.server.port}`)
})
