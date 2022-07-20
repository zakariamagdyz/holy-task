import { render, screen } from "@testing-library/react";
import withChecks from "../utils/withChecks";

const DummyComponnent = ({ data }: { data: { name: string }[] }) => (
  <div data-testId="data">hello {data[0].name}</div>
);

test("Should return spinner when isLoading state is true", () => {
  const DummyComponentWithChecks = withChecks(DummyComponnent);

  render(
    <DummyComponentWithChecks data={null} isLoading={true} error={null} />
  );

  const spinnerOverlay = screen.queryByTestId("spinner-overlay");
  const spinner = screen.queryByTestId("spinner");

  // assert
  expect(spinnerOverlay).toBeInTheDocument();
  expect(spinner).toBeInTheDocument();
});

test("shouldn't render errorMesg or data components if isLoading true", () => {
  const DummyComponentWithChecks = withChecks(DummyComponnent);

  render(
    <DummyComponentWithChecks data={null} isLoading={true} error={null} />
  );

  const wrappedComponent = screen.queryByTestId("data");
  const errorMsg = screen.queryByRole("paragraph");
  // assert
  expect(wrappedComponent).not.toBeInTheDocument();
  expect(errorMsg).not.toBeInTheDocument();
});

test("Should return error message if there is an error", () => {
  const DummyComponentWithChecks = withChecks(DummyComponnent);

  render(
    <DummyComponentWithChecks
      data={null}
      isLoading={false}
      error={"error msg"}
    />
  );

  const errorMsg = screen.queryByRole("paragraph");

  expect(errorMsg).toBeInTheDocument();
});

test("shouldn't render data or spinner if there is an error", () => {
  const DummyComponentWithChecks = withChecks(DummyComponnent);

  render(
    <DummyComponentWithChecks
      data={null}
      isLoading={false}
      error={"error msg"}
    />
  );
  const spinnerOverlay = screen.queryByTestId("spinner-overlay");
  const spinner = screen.queryByTestId("spinner");
  const wrappedComponent = screen.queryByTestId("data");

  expect(spinnerOverlay).not.toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
  expect(wrappedComponent).not.toBeInTheDocument();
});

test("Should return wrapped components if is no error and isLoading is false", () => {
  const DummyComponentWithChecks = withChecks(DummyComponnent);

  render(
    <DummyComponentWithChecks
      data={[{ name: "zakaria" }]}
      isLoading={false}
      error={null}
    />
  );

  const wrappedComponent = screen.queryByTestId("data");

  expect(wrappedComponent).toBeInTheDocument();
  expect(wrappedComponent).toHaveTextContent(/hello zakaria/i);
});

test("Shouldn't render any of errorMsg or spinner components if data is fetched", () => {
  const DummyComponentWithChecks = withChecks(DummyComponnent);

  render(
    <DummyComponentWithChecks
      data={[{ name: "zakaria" }]}
      isLoading={false}
      error={null}
    />
  );

  const spinnerOverlay = screen.queryByTestId("spinner-overlay");
  const spinner = screen.queryByTestId("spinner");
  const errorMsg = screen.queryByRole("paragraph");

  expect(spinnerOverlay).not.toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
  expect(errorMsg).not.toBeInTheDocument();
});
