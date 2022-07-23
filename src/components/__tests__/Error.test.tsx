import { screen, render } from "@testing-library/react";
import Error from "../Error";

test("Should render Error components with custom message and initial img", () => {
  render(<Error message="Somthing went wrong" />);

  expect(screen.getByText(/Somthing went wrong/i)).toBeInTheDocument();
});
