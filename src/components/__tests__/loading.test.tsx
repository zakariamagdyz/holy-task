import { screen, render } from "@testing-library/react";
import Loading from "../Loading";

test("should render a spinner", () => {
  render(<Loading />);

  const spinner = screen.getByTestId("spinner");

  expect(spinner).toBeInTheDocument();
});
