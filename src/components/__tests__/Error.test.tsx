import { screen, render } from "@testing-library/react";
import Error from "../Error";

test("Should render Error components with custom message and initial img", () => {
  render(<Error message="Somthing went wrong" />);

  const errorMsg = screen.getByText(/Somthing went wrong/i);

  expect(errorMsg).toBeInTheDocument();
});
