const {JSDOM} = require('jsdom')
const {apiUrl, cacheExpirationSeconds} = require('./conf')

class Api {
  constructor (fetch, cache) {
    this.fetch = fetch
    this.cache = cache
  }

  async fetchItem (itemName) {
    const cacheResult = await this.cache.get(itemName)
    if (cacheResult !== null) {
      return JSON.parse(cacheResult)
    }

    const response = await this.fetch(`${apiUrl}/${encode(itemName)}`)
    const dom = new JSDOM(await response.text())
    const wikiTable = dom.window.document.querySelector('.infobox')

    if (wikiTable === null) {
      return null
    }

    const result = {
      name: getText(wikiTable, 'caption'),
      value: getText(wikiTable, '.infobox-quantity-replace'),
      imageUrl: getAttribute(wikiTable, '.infobox-image img', 'src')
    }

    await this.cache.set(itemName, JSON.stringify(result), 'EX', cacheExpirationSeconds)

    return result
  }
}

const encode = str => encodeURIComponent(str)

const getText = (element, cssSelector) => element.querySelector(cssSelector).textContent

const getAttribute = (element, cssSelector, attribute) => element.querySelector(cssSelector).getAttribute(attribute)

module.exports = Api
