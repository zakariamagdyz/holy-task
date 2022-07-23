import {
  deleteUserAction,
  setEditModeOn,
  setEditModeOff,
  setUsersListAction,
  toggleLikeAction,
  updateUserAction,
  toggleDarkMode,
} from "../actions";
import storeReducer from "../store-reducer";
import {
  dummyStoreWithUsersData,
  dummyFetchedUsersWithLike,
  dummyCurrentUser,
} from "../../data/dummyData";
import { StoreType } from "../../types/store";

let dummyStore: StoreType;

describe("Test Reducer", () => {
  beforeEach(() => {
    dummyStore = JSON.parse(JSON.stringify(dummyStoreWithUsersData));
  });

  describe("setUsersListAction", () => {
    it("should return a store with new usersList", () => {
      const newStore = storeReducer(
        dummyStore,
        setUsersListAction(dummyFetchedUsersWithLike)
      );

      expect(newStore.users).toEqual(dummyFetchedUsersWithLike);
    });
  });

  describe("SetEditModeOn", () => {
    it("should convert editMode to On if it's initial value is Off and add currentInfo", () => {
      const newStore = storeReducer(
        dummyStore,
        setEditModeOn(dummyCurrentUser)
      );

      expect(newStore.editMode.mode).toBe("ON");
      expect(newStore.editMode.currentInfo).toEqual(dummyCurrentUser);
    });
  });

  describe("SetEditModeOff", () => {
    it("should convert editMode to OFF and remove currentInfo", () => {
      const newStore = storeReducer(dummyStore, setEditModeOff());

      expect(newStore.editMode.mode).toBe("OFF");
      expect(newStore.editMode.currentInfo).toBeNull();
    });
  });
  describe("ToggleLikeAction", () => {
    it("should toggle like property for specefic user", () => {
      // arrange
      dummyStore.users![0].hasLike = true;

      const newStore = storeReducer(
        dummyStore,
        toggleLikeAction(dummyStore.users![0].id)
      );

      expect(newStore.users).toEqual([
        { ...dummyStore.users![0], hasLike: false },
        { ...dummyStore.users![1] },
      ]);
    });
  });

  describe("UpdateUserAction", () => {
    it("should update specefic user with new data", () => {
      const newStore = storeReducer(
        dummyStore,
        updateUserAction({ ...dummyCurrentUser, name: "mahmoud" })
      );
      console.log(newStore);

      expect(newStore.users).toEqual([
        { ...dummyStore.users![0], name: "mahmoud" },
        { ...dummyStore.users![1] },
      ]);
    });
  });

  describe("deleteUserAction", () => {
    it("should delete user from usersList", () => {
      const newStore = storeReducer(
        dummyStore,
        deleteUserAction(dummyStore.users![0].id)
      );

      expect(newStore.users).toEqual([{ ...dummyStore.users![1] }]);
    });
  });

  describe("ToggleDarkMode", () => {
    test("should disable darkMode if it's already enabled", () => {
      //arrange
      dummyStore.darkMode = "ON";

      const newStore = storeReducer(dummyStore, toggleDarkMode());

      expect(newStore.darkMode).toEqual("OFF");
    });

    test("should enable darkMode if it's already disabled", () => {
      dummyStore.darkMode = "OFF";

      const newStore = storeReducer(dummyStore, toggleDarkMode());

      expect(newStore.darkMode).toEqual("ON");
    });
  });
});
