const Boom = require('boom')
const Routes = require('./routes')

test('returns the item', async () => {
  const mockApi = {fetchItem: jest.fn(() => Promise.resolve({name: 'itemName'}))}

  const routes = new Routes(mockApi)
  const expected = {name: 'itemName'}
  const actual = await routes.fetchItem({params: {itemName: 'itemName'}})

  expect(actual).toEqual(expected)
})

test('throws if the item cannot be found', async () => {
  const mockApi = {fetchItem: jest.fn(() => Promise.resolve(null))}
  const routes = new Routes(mockApi)

  try {
    await routes.fetchItem({params: {itemName: 'itemName'}})
    fail()
  } catch (e) {
    expect(e).toEqual(Boom.notFound('Cannot find the requested item'))
  }
})
