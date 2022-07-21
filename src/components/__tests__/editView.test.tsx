import { screen, render, fireEvent } from "@testing-library/react";
import { storeContext } from "../../store/store-context";
import { contextValueTypes } from "../../types/store";
import EditView from "../EditView";

const dummyInitialStoreData = {
  state: {
    users: null,
    editMode: {
      mode: "OFF",
      currentInfo: {
        name: "zakaria",
        website: "http://www.zakaria.com",
        phone: "011",
        email: "zakaria.com",
      },
    },
  },
  dispatch: jest.fn(),
} as unknown as contextValueTypes;

test("should render all edit inputs with initial user data", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditView />
    </storeContext.Provider>
  );

  const nameInput = screen.getByDisplayValue("zakaria");
  const emailInput = screen.getByDisplayValue("zakaria.com");
  const websiteInput = screen.getByDisplayValue("http://www.zakaria.com");
  const PhoneInput = screen.getByDisplayValue("011");

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(websiteInput).toBeInTheDocument();
  expect(PhoneInput).toBeInTheDocument();
});

test("shouldn't render error message if all fields are filled", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditView />
    </storeContext.Provider>
  );

  const errorMsg = screen.queryByTestId("form-error");
  expect(errorMsg).not.toBeInTheDocument();
});

test("should render an error message if any input has an empty value", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditView />
    </storeContext.Provider>
  );

  const nameInput = screen.getByDisplayValue("zakaria");
  // simulate user actions
  fireEvent.change(nameInput, { target: { value: "" } });
  // get error message
  const errorMsg = screen.queryByTestId("form-error");

  expect(errorMsg).toBeInTheDocument();
});

test("should render all action btns (close-cancel-save)", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditView />
    </storeContext.Provider>
  );

  const actionBtns = screen.getAllByRole("button");
  expect(actionBtns).toHaveLength(3);
});

test("should render disabled ok btn if any of input fileds has an empty value", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditView />
    </storeContext.Provider>
  );

  // simulate user actions
  const nameInput = screen.getByDisplayValue("zakaria");
  fireEvent.change(nameInput, { target: { value: "" } });
  // get btn
  const actionBtns = screen.getByText(/ok/i);
  // eslint-disable-next-line
  screen.debug();
  expect(actionBtns.className).toContain("Mui-disabled");
});

test("should render visible ok btn if all input values is filled", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditView />
    </storeContext.Provider>
  );

  // get btn
  const actionBtns = screen.getByText(/ok/i);
  // eslint-disable-next-line
  screen.debug();
  expect(actionBtns.className).not.toContain("Mui-disabled");
});
