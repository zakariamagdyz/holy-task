import { toggleLike, deleteUser, updateUserInfo } from "../utils";
import {
  deleteUserAction,
  toggleLikeAction,
  updateUserAction,
} from "../actions";
import {
  dummyCurrentUser,
  dummyStoreWithUsersData,
  dummyFetchedUsersWithLike,
} from "../../data/dummyData";
import { StoreType } from "../../types/store";

let dummyStore: StoreType;

describe("Togglelike", () => {
  beforeEach(() => {
    dummyStore = { ...dummyStoreWithUsersData };
  });

  it("should add like if user doesn't have a like", () => {
    // Arrange
    dummyStore.users![0].hasLike = false;

    // Act
    const data = toggleLike(dummyStore, toggleLikeAction(dummyCurrentUser.id));

    // Assert
    expect(data).toEqual([
      { ...dummyCurrentUser, hasLike: true },
      { ...dummyFetchedUsersWithLike[1] },
    ]);
  });

  it("should remove a like if user already has it", () => {
    dummyStore.users![0].hasLike = true;
    // Arrange

    // Act
    const data = toggleLike(dummyStore, toggleLikeAction(dummyCurrentUser.id));

    // Assert
    expect(data).toEqual([
      { ...dummyCurrentUser, hasLike: false },
      { ...dummyFetchedUsersWithLike[1] },
    ]);
  });
});

describe("updateUserInfo", () => {
  it("should update user info (name,phone)", () => {
    // Act
    const data = updateUserInfo(
      dummyStore,
      updateUserAction({ ...dummyCurrentUser, name: "zakaria magdy" })
    );

    // Assert
    expect(data).toEqual([
      { ...dummyCurrentUser, name: "zakaria magdy" },
      { ...dummyFetchedUsersWithLike[1] },
    ]);
  });
});

describe("deleteUser", () => {
  it("should remove user from usersList", () => {
    // Act
    const data = deleteUser(dummyStore, deleteUserAction(dummyCurrentUser.id));

    // Assert
    expect(data).toEqual([{ ...dummyFetchedUsersWithLike[1] }]);
  });
});
