import { toggleLike, deleteUser, updateUserInfo } from "../utils";
import {
  deleteUserAction,
  toggleLikeAction,
  updateUserAction,
} from "../actions";

describe("Togglelike", () => {
  it("should add like if user doesn't have a like", () => {
    // Arrange
    const dummyUserData = {
      users: [
        { id: 1, name: "zakaria", email: "zakaria@gmail.com", hasLike: false },
      ],
    };

    // Act
    const data = toggleLike(
      //@ts-ignore
      dummyUserData,
      toggleLikeAction(dummyUserData.users[0].id)
    );

    // Assert
    expect(data).toEqual([
      { id: 1, name: "zakaria", email: "zakaria@gmail.com", hasLike: true },
    ]);
  });

  it("should remove a like if user already has it", () => {
    // Arrange
    const dummyUserData = {
      users: [
        { id: 1, name: "zakaria", email: "zakaria@gmail.com", hasLike: true },
      ],
    };

    // Act
    const data = toggleLike(
      //@ts-ignore
      dummyUserData,
      toggleLikeAction(dummyUserData.users[0].id)
    );

    // Assert
    expect(data).toEqual([
      { id: 1, name: "zakaria", email: "zakaria@gmail.com", hasLike: false },
    ]);
  });
});

describe("updateUserInfo", () => {
  it("should update user info (name,phone)", () => {
    // Arrange
    const dummyUserData = {
      users: [
        {
          id: 1,
          name: "zakaria",
          email: "zakaria@gmail.com",
          phone: "012",
        },
      ],
    };

    // Act
    const data = updateUserInfo(
      //@ts-ignore
      dummyUserData,
      updateUserAction({ id: 1, name: "zakaria magdy", phone: "011" })
    );

    // Assert
    expect(data).toEqual([
      {
        id: 1,
        name: "zakaria magdy",
        email: "zakaria@gmail.com",
        phone: "011",
      },
    ]);
  });
});

describe("deleteUser", () => {
  it("should remove user from usersList", () => {
    // Arrange
    const dummyUserData = {
      users: [
        {
          id: 1,
          name: "zakaria",
          email: "zakaria@gmail.com",
          phone: "012",
        },
      ],
    };

    // Act
    const data = deleteUser(
      //@ts-ignore
      dummyUserData,
      deleteUserAction(dummyUserData.users[0].id)
    );

    // Assert
    expect(data).toEqual([]);
  });
});
