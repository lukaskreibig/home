import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

const server = setupServer(
  rest.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations', (req, res, ctx) => {
    return res(ctx.json({test: 'test'}))
  }),
  rest.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/averages', (req, res, ctx) => {
    return res(ctx.json({test: 'test'}))
  }),
  rest.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries', (req, res, ctx) => {
    return res(ctx.json({test: 'test'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Modal and Loading Data Text Test', async () => {
  render(<App />)

  const airPollutionData = screen.getByText(/Air Pollution Data worldwide/i);
  expect(airPollutionData).toBeInTheDocument();
  const loadingData = screen.getByText(/Loading Data/i);
  expect(loadingData).toBeInTheDocument();
})

test('Server Error Test', async () => {
  server.use(
    rest.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  server.use(
    rest.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/averages', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  server.use(
    rest.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<App />)

  const loadingData = await screen.findByText(/Error/i);
  expect(loadingData).toBeInTheDocument();
})