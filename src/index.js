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
  handler: async (request, reply) => {
    const itemName = request.params.itemName
    const item = await fetchItem(fetch, redisCache, itemName)
    reply(item)
  }
})

server.start(err => {
  if (err) {
    throw err
  }
})
