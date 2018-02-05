const Hapi = require('hapi')
const fetch = require('node-fetch')
const redis = require('redis')
const conf = require('./conf')
const Api = require('./api')
const Routes = require('./routes')
const RedisCache = require('./redis-cache')

const server = new Hapi.Server({port: conf.server.port, host: conf.server.host, routes: {cors: true}})
const redisCache = new RedisCache(redis, conf.redis.host, conf.redis.port)
const api = new Api(fetch, redisCache)
const routes = new Routes(api)

server.route({
  method: 'GET',
  path: '/items/{itemName}',
  handler: request => routes.fetchItem(request)
})

server.start(err => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${conf.server.port}`)
})
