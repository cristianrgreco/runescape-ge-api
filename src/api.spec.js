const Api = require('./api')
const {getFixture} = require('./fixtures')

const expected = {
  name: 'Santa hat',
  value: '644,168,876',
  imageUrl: 'https://vignette.wikia.nocookie.net/runescape2/images/4/47/Santa_hat.png/revision/latest?cb=20160502072108'
}

test('fetches an item from the api and persists to cache', async () => {
  const mockCache = {
    get: jest.fn(() => Promise.resolve(null)),
    set: jest.fn(() => Promise.resolve())
  }
  const mockFetch = jest.fn(() => Promise.resolve({text: jest.fn(() => Promise.resolve(getFixture('santa-hat.html')))}))

  const api = new Api(mockFetch, mockCache)
  const actual = await api.fetchItem('santa hat')

  expect(actual).toEqual(expected)
  expect(mockCache.get).toHaveBeenCalledWith('santa hat')
  expect(mockCache.set).toHaveBeenCalledWith('santa hat', JSON.stringify(expected))
  expect(mockFetch).toHaveBeenCalledWith('http://runescape.wikia.com/wiki/santa%20hat')
})

test('fetches an item from the cache', async () => {
  const mockCache = {
    get: jest.fn(itemName => {
      if (itemName === 'santa hat') {
        return Promise.resolve(JSON.stringify(expected))
      }
    }),
    set: jest.fn()
  }
  const mockFetch = jest.fn()

  const api = new Api(mockFetch, mockCache)
  const actual = await api.fetchItem('santa hat')

  expect(actual).toEqual(expected)
  expect(mockCache.get).toHaveBeenCalledWith('santa hat')
  expect(mockCache.set).not.toHaveBeenCalled()
  expect(mockFetch).not.toHaveBeenCalled()
})

test('returns null if item cannot be found', async () => {
  const mockCache = {get: jest.fn(() => Promise.resolve(null))}
  const mockFetch = jest.fn(() => Promise.resolve({text: jest.fn(() => Promise.resolve(getFixture('not-found.html')))}))

  const api = new Api(mockFetch, mockCache)
  const actual = await api.fetchItem('santa hatt')

  expect(actual).toBeNull()
})
