import { StoreType, storeAction, UserResponseWithLikes } from "../types/store";

export const toggleLike = (store: StoreType, action: storeAction) => {
  return store.users?.map((user) => {
    if (user.id === action.payload) {
      return { ...user, hasLike: !user.hasLike };
    }
    return user;
  }) as UserResponseWithLikes[];
};

export const updateUserInfo = (store: StoreType, action: storeAction) => {
  return store.users?.map((user) => {
    if (user.id === action.payload.id) {
      return { ...user, ...action.payload };
    }
    return user;
  }) as UserResponseWithLikes[];
};

export const deleteUser = (store: StoreType, action: storeAction) => {
  return store.users?.filter(
    (user) => user.id !== action.payload
  ) as UserResponseWithLikes[];
};

export const getModeFromLocalStorage = () => {
  try {
    const Mode = localStorage.getItem("darkMode");
    if (Mode) {
      return JSON.parse(Mode) === "ON" ? "ON" : "OFF";
    }
    return "OFF";
  } catch (error) {
    return "OFF";
  }
};
