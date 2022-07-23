import { screen, render } from "@testing-library/react";
import EditInputs from "../EditInputs";

const editInputsProps = {
  formValues: { name: "", phone: "", website: "", email: "" },
  handleInputChange: jest.fn(),
};

describe("EditInputs", () => {
  test("should render four input fields equal to the numbers of formValues keys", () => {
    render(<EditInputs {...editInputsProps} />);

    expect(screen.getAllByTestId("formInput")).toHaveLength(4);
  });

  test("should render all inputs with initial values (hola)", () => {
    render(
      <EditInputs
        {...editInputsProps}
        formValues={{
          name: "hola",
          phone: "hola",
          website: "hola",
          email: "hola",
        }}
      />
    );

    expect(screen.getAllByDisplayValue("hola")).toHaveLength(4);
  });
});
