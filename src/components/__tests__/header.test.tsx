import { screen, render } from "@testing-library/react";
import { storeContext } from "../../store/store-context";
import { contextValueTypes } from "../../types/store";
import Header from "../Header";

const dummyInitialStoreData = {
  state: {
    users: null,
    editMode: {
      mode: "OFF",
      currentInfo: null,
    },
    darkMode: "OFF",
  },
  dispatch: jest.fn(),
} as unknown as contextValueTypes;

test("should render header components with mode button and title", () => {
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <Header />
    </storeContext.Provider>
  );

  const title = screen.getByText(/hollydesk task/i);
  const modeBtn = screen.getByRole("button");

  expect(title).toBeInTheDocument();
  expect(modeBtn).toBeInTheDocument();
});

test("should render the dark toggle button if the darkMode is off", () => {
  // set the dark mode to off
  dummyInitialStoreData.state.darkMode = "OFF";
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <Header />
    </storeContext.Provider>
  );

  const darkBtn = screen.getByTestId("dark");

  expect(darkBtn).toBeInTheDocument();
});

test("should render the light toggle button if the darkMode is ON", () => {
  // set the dark mode to off
  dummyInitialStoreData.state.darkMode = "ON";
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <Header />
    </storeContext.Provider>
  );

  const lightBtn = screen.getByTestId("light");

  expect(lightBtn).toBeInTheDocument();
});
