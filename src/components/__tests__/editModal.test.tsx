import { render, screen } from "@testing-library/react";
import { storeContext } from "../../store/store-context";
import { contextValueTypes } from "../../types/store";
import EditModel from "../EditModal";
import { dummyCurrentUser } from "../../data/dummyData";

let dummyInitialStoreData: contextValueTypes;

describe("EditModel", () => {
  beforeEach(() => {
    dummyInitialStoreData = {
      state: {
        users: null,
        editMode: { mode: "OFF", currentInfo: null },
        darkMode: "OFF",
      },
      dispatch: jest.fn(),
    };
  });

  test("should open the modal when edit mode is ON", () => {
    // change data of store
    dummyInitialStoreData.state.darkMode = "ON";
    dummyInitialStoreData.state.editMode = {
      mode: "ON",
      currentInfo: dummyCurrentUser,
    };

    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditModel />
      </storeContext.Provider>
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  test("should close the modal when edit mode is OFF", () => {
    // arrange
    dummyInitialStoreData.state.editMode = { mode: "OFF", currentInfo: null };

    render(
      <storeContext.Provider value={dummyInitialStoreData}>
        <EditModel />
      </storeContext.Provider>
    );

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
