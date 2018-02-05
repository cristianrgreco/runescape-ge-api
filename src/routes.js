const Boom = require('boom')

class Routes {
  constructor (api) {
    this.api = api
  }

  async fetchItem (request) {
    const item = await this.api.fetchItem(request.params.itemName)
    if (item === null) {
      throw Boom.notFound('Cannot find the requested item')
    }
    return item
  }
}

module.exports = Routes
