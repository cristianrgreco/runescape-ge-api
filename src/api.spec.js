const {fetchItem} = require('./api')
const {getFixture} = require('./fixtures')

test('fetches an item from the api and persists to cache', async () => {
  const expected = {
    name: 'Santa hat',
    value: '644,168,876',
    imageUrl: 'https://vignette.wikia.nocookie.net/runescape2/images/4/47/Santa_hat.png/revision/latest?cb=20160502072108'
  }

  const mockCache = {
    get: jest.fn(() => Promise.resolve(null)),
    set: jest.fn(() => Promise.resolve())
  }
  const mockFetch = jest.fn(() => Promise.resolve({text: jest.fn(() => Promise.resolve(getFixture('santa-hat.html')))}))

  const actual = await fetchItem(mockFetch, mockCache, 'santa hat')

  expect(actual).toEqual(expected)
  expect(mockCache.get).toHaveBeenCalledWith('santa hat')
  expect(mockCache.set).toHaveBeenCalledWith('santa hat', JSON.stringify(expected))
  expect(mockFetch).toHaveBeenCalledWith('http://runescape.wikia.com/wiki/santa%20hat')
})

test('fetches an item from the cache', async () => {
  const expected = {
    name: 'Santa hat',
    value: '644,168,876',
    imageUrl: 'https://vignette.wikia.nocookie.net/runescape2/images/4/47/Santa_hat.png/revision/latest?cb=20160502072108'
  }

  const mockCache = {
    get: jest.fn(itemName => {
      if (itemName === 'santa hat') {
        return Promise.resolve(JSON.stringify(expected))
      }
    }),
    set: jest.fn()
  }
  const mockFetch = jest.fn()

  const actual = await fetchItem(mockFetch, mockCache, 'santa hat')

  expect(actual).toEqual(expected)
  expect(mockCache.get).toHaveBeenCalledWith('santa hat')
  expect(mockCache.set).not.toHaveBeenCalled()
  expect(mockFetch).not.toHaveBeenCalled()
})
