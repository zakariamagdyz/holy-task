import { screen, render } from "@testing-library/react";
import Loading from "../Loading";

test("should render a spinner", () => {
  render(<Loading />);

  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});
