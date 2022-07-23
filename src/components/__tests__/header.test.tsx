import { screen, render } from "@testing-library/react";
import { storeContext } from "../../store/store-context";
import { contextValueTypes } from "../../types/store";
import Header from "../Header";

let dummyInitialStoreData: contextValueTypes;

describe("Header", () => {
  beforeEach(() => {
    dummyInitialStoreData = {
      state: {
        users: null,
        editMode: {
          mode: "OFF",
          currentInfo: null,
        },
        darkMode: "OFF",
      },
      dispatch: jest.fn(),
    };
  });
  test("should render header components with mode button and title", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <Header />
      </storeContext.Provider>
    );

    expect(screen.getByText(/hollydesk task/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should render the dark toggle button if the darkMode is off", () => {
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <Header />
      </storeContext.Provider>
    );

    expect(screen.getByTestId("dark")).toBeInTheDocument();
  });

  test("should render the light toggle button if the darkMode is ON", () => {
    // set the dark mode to off
    dummyInitialStoreData.state.darkMode = "ON";
    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <Header />
      </storeContext.Provider>
    );

    expect(screen.getByTestId("light")).toBeInTheDocument();
  });
});
