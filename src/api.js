const {JSDOM} = require('jsdom')
const {apiUrl} = require('./conf')

const fetchItem = async (fetch, itemName) => {
  const response = await fetch(`${apiUrl}/${encode(itemName)}`)
  const dom = new JSDOM(await response.text())
  const wikiTable = dom.window.document.querySelector('.infobox')

  return {
    name: getText(wikiTable, 'caption'),
    value: getText(wikiTable, '.infobox-quantity-replace'),
    imageUrl: getAttribute(wikiTable, '.infobox-image img', 'src')
  }
}

const encode = str => encodeURIComponent(str)

const getText = (element, cssSelector) => element.querySelector(cssSelector).textContent

const getAttribute = (element, cssSelector, attribute) => element.querySelector(cssSelector).getAttribute(attribute)

module.exports = {fetchItem}
