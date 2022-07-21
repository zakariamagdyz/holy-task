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

export const isEmptyValue = <k extends Record<string, string>>(obj: k) => {
  let isEmpty = false;
  let key: keyof k;
  for (key in obj) {
    if (obj[key].trim() === "") {
      isEmpty = true;
      break;
    }
  }
  return isEmpty;
};
