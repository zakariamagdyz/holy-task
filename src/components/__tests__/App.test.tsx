import { render, screen } from "@testing-library/react";
import App from "../../App";
import StoreProvider from "../../store/store-context";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { dummyFetchedUsers } from "../../data/dummyData";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyFetchedUsers));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
//afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

const renderAppComponentWithProvider = () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

describe("App", () => {
  test("should render the spinner while fetching data from the server", () => {
    renderAppComponentWithProvider();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryAllByRole("article").length).toBe(0);
  });

  test("should render error message when data fetching is failed", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users",
        (req, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({ status: "error", message: "fail" })
          );
        }
      )
    );

    renderAppComponentWithProvider();

    expect(await screen.findByTestId("error-msg")).toBeInTheDocument();

    expect(screen.queryByRole("article")).toBe(null);
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  test("should render the correct number of userCard after fetching data", async () => {
    renderAppComponentWithProvider();

    expect((await screen.findAllByRole("article")).length).toBe(2);
  });
});
