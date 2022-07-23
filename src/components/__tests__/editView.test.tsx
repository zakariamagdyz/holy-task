import { screen, render, fireEvent } from "@testing-library/react";
import { storeContext } from "../../store/store-context";
import { contextValueTypes } from "../../types/store";
import EditView from "../EditView";
import { dummyCurrentUser } from "../../data/dummyData";

const dummyInitialStoreData: contextValueTypes = {
  state: {
    users: null,
    editMode: {
      mode: "OFF",
      currentInfo: dummyCurrentUser,
    },
    darkMode: "OFF",
  },
  dispatch: jest.fn(),
};

describe("EditView", () => {
  test("should render all edit inputs with initial user data", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditView />
      </storeContext.Provider>
    );

    expect(screen.getByDisplayValue(/Leanne Graham/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Sincere@april.biz/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/hildegard.org/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/1-770-736-8031 x56442/i)
    ).toBeInTheDocument();
  });
});

describe("Error handling", () => {
  test("shouldn't render error message if all fields are filled", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditView />
      </storeContext.Provider>
    );

    expect(screen.queryByTestId("form-error")).not.toBeInTheDocument();
  });

  test("should render an error message if any input has an empty value", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditView />
      </storeContext.Provider>
    );

    // simulate user actions
    const nameInput = screen.getByDisplayValue(/Leanne Graham/i);
    fireEvent.change(nameInput, { target: { value: "" } });

    expect(screen.getByTestId("form-error")).toBeInTheDocument();
  });
});

describe("Action btns", () => {
  test("should render all action btns (close-cancel-save)", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditView />
      </storeContext.Provider>
    );

    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  test("should render disabled ok btn if any of input fileds has an empty value", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditView />
      </storeContext.Provider>
    );

    // simulate user actions
    const nameInput = screen.getByDisplayValue(/Leanne Graham/i);
    fireEvent.change(nameInput, { target: { value: "" } });

    expect(screen.getByText(/ok/i)).toBeDisabled();
  });

  test("should render visible ok btn if all input values is filled", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditView />
      </storeContext.Provider>
    );

    // get btn
    expect(screen.getByText(/ok/i)).toBeEnabled();
  });
});
