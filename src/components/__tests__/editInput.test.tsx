import { screen, render } from "@testing-library/react";
import EditInputs from "../EditInputs";

test("should render four input fields equal to the numbers of formValues keys", () => {
  render(
    <EditInputs
      formValues={{ name: "", phone: "", website: "", email: "" }}
      handleInputChange={jest.fn()}
    />
  );
  const formInputs = screen.getAllByTestId("formInput");

  expect(formInputs).toHaveLength(4);
});

test("should render all inputs with initial values (hola)", () => {
  render(
    <EditInputs
      formValues={{
        name: "hola",
        phone: "hola",
        website: "hola",
        email: "hola",
      }}
      handleInputChange={jest.fn()}
    />
  );
  const formInputs = screen.getAllByDisplayValue("hola");

  expect(formInputs).toHaveLength(4);
});
