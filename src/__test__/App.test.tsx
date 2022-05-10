import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

const server = setupServer(
  rest.get(
    "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations",
    (req, res, ctx) => {
      return res(ctx.json({ test: "test" }));
    }
  ),
  rest.get(
    "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/averages",
    (req, res, ctx) => {
      return res(ctx.json({ test: "test" }));
    }
  ),
  rest.get(
    "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries",
    (req, res, ctx) => {
      return res(ctx.json({ test: "test" }));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Modal and Loading Data Text Test", async () => {
  render(<App />);

  const airPollutionData = screen.getByText(/Air Pollution Data worldwide/i);
  expect(airPollutionData).toBeVisible();
  const loadingData = screen.getByText(/Loading Data/i);
  expect(loadingData).toBeInTheDocument();
});

describe("Server Error Tests", () => {
  test("Server Error Locations Fetch", async () => {
    server.use(
      rest.get(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<App />);

    const loadingData = await screen.findByText(/Location Data/i);
    expect(loadingData).toBeInTheDocument();
  });

  test("Server Error Averages Fetch", async () => {
    server.use(
      rest.get(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/averages",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<App />);

    const loadingData = await screen.findByText(/Average Data/i);
    expect(loadingData).toBeInTheDocument();
  });

  test("Server Error Countries Fetch", async () => {
    server.use(
      rest.get(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<App />);

    const loadingData = await screen.findByText(/Country Data/i);
    expect(loadingData).toBeInTheDocument();
  });
});
