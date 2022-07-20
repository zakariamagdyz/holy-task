import { StoreType } from "../../types/store";
import {
  deleteUserAction,
  setEditModeOn,
  setEditModeOff,
  setUsersListAction,
  toggleLikeAction,
  updateUserAction,
} from "../actions";
import storeReducer from "../store-reducer";

const initialStore = jest.fn().mockReturnValue({
  users: null,
  currentUser: null,
  editMode: false,
})() as StoreType;

describe("Test Reducer", () => {
  describe("setUsersListAction", () => {
    it("should return a store with new usersList", () => {
      const userList = [
        { id: 1, name: "zakaria", phone: "011" },
        { id: 2, name: "ahmed", phone: "012" },
      ];
      // @ts-ignore
      const newStore = storeReducer(initialStore, setUsersListAction(userList));

      expect(newStore.users).toEqual(userList);
    });
  });

  describe("SetEditModeOn", () => {
    it("should convert editMode to On if it's initial value is Off and add currentInfo", () => {
      const currentUser = { id: 1, name: "zakarai", phone: "011" };

      // @ts-ignore
      const newStore = storeReducer(initialStore, setEditModeOn(currentUser));

      expect(newStore.editMode.mode).toBe("ON");
      expect(newStore.editMode.currentInfo).toEqual(currentUser);
    });
  });

  describe("SetEditModeOff", () => {
    it("should convert editMode to OFF and remove currentInfo", () => {
      // @ts-ignore
      const newStore = storeReducer(initialStore, setEditModeOff());

      expect(newStore.editMode.mode).toBe("OFF");
      expect(newStore.editMode.currentInfo).toBeNull();
    });
  });
  describe("ToggleLikeAction", () => {
    it("should toggle like property for specefic user", () => {
      initialStore.users = [
        // @ts-ignore
        { id: 1, name: "zakarai", phone: "011", hasLike: false },
      ];

      const newStore = storeReducer(
        initialStore,
        // @ts-ignore
        toggleLikeAction(initialStore.users[0].id)
      );

      expect(newStore.users).toEqual([
        { id: 1, name: "zakarai", phone: "011", hasLike: true },
      ]);
    });
  });

  describe("UpdateUserAction", () => {
    it("should update specefic user with new data", () => {
      initialStore.users = [
        // @ts-ignore
        { id: 1, name: "zakarai", phone: "011", hasLike: false },
        // @ts-ignore
        { id: 3, name: "ahmed", phone: "021", hasLike: true },
      ];

      const newStore = storeReducer(
        initialStore,
        // @ts-ignore
        updateUserAction({ id: 1, name: "zakaria magdy" })
      );

      expect(newStore.users).toEqual([
        { id: 1, name: "zakaria magdy", phone: "011", hasLike: false },
        { id: 3, name: "ahmed", phone: "021", hasLike: true },
      ]);
    });
  });

  describe("deleteUserAction", () => {
    it("should delete user from usersList", () => {
      initialStore.users = [
        // @ts-ignore
        { id: 1, name: "zakarai", phone: "011", hasLike: false },
        // @ts-ignore
        { id: 3, name: "ahmed", phone: "021", hasLike: true },
      ];

      const newStore = storeReducer(
        initialStore,
        // @ts-ignore
        deleteUserAction(initialStore.users[0].id)
      );

      expect(newStore.users).toEqual([
        { id: 3, name: "ahmed", phone: "021", hasLike: true },
      ]);
    });
  });

  describe("Unknown Action type", () => {
    it("should throw an error if the action type is unknown", () => {
      expect(() => {
        storeReducer(initialStore, {
          type: "UNKNOWN_ACTION_TYPE",
          payload: null,
        });
      }).toThrow();
    });
  });
});
