import { render, screen } from "@testing-library/react";
import { storeContext } from "../../store/store-context";
import { contextValueTypes } from "../../types/store";
import EditModel from "../EditModal";

const dummyInitialStoreData: contextValueTypes = {
  state: { users: null, editMode: { mode: "OFF", currentInfo: null } },
  dispatch: jest.fn(),
};
test("should open the modal when edit mode is ON", () => {
  // arrange
  dummyInitialStoreData.state.editMode.mode = "ON";
  //@ts-ignore
  dummyInitialStoreData.state.editMode.currentInfo = {
    name: "zakaria",
    phone: "011",
  };
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditModel />
    </storeContext.Provider>
  );

  const modal = screen.queryByTestId("modal");

  expect(modal).toBeInTheDocument();
});

test("should close the modal when edit mode is OFF", () => {
  // arrange
  dummyInitialStoreData.state.editMode.mode = "OFF";
  render(
    <storeContext.Provider value={dummyInitialStoreData}>
      <EditModel />
    </storeContext.Provider>
  );

  const modal = screen.queryByTestId("modal");

  expect(modal).not.toBeInTheDocument();
});
