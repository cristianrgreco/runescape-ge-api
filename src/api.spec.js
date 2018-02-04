const {fetchItem} = require('./api')
const {getFixture} = require('./fixtures')

test('fetches an item', async () => {
  const fixture = getFixture('santa-hat.html')
  const mockFetch = jest.fn(() => Promise.resolve({text: jest.fn(() => Promise.resolve(fixture))}))

  const expected = {
    name: 'Santa hat',
    value: '644,168,876',
    imageUrl: 'https://vignette.wikia.nocookie.net/runescape2/images/4/47/Santa_hat.png/revision/latest?cb=20160502072108'
  }
  const actual = await fetchItem(mockFetch, 'santa hat')

  expect(actual).toEqual(expected)
  expect(mockFetch).toHaveBeenCalledWith('http://runescape.wikia.com/wiki/santa%20hat')
})
