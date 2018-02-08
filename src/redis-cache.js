class RedisCache {
  constructor (redis, host, port) {
    this.client = redis.createClient(port, host)
  }

  get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          return reject(err)
        }
        resolve(reply)
      })
    })
  }

  set (key, value, ...options) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, ...options, (err, reply) => {
        if (err) {
          return reject(err)
        }
        resolve(reply)
      })
    })
  }
}

module.exports = RedisCache
