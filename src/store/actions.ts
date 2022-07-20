import { UserResponseWithLikes } from "../types/store";

export enum ACTION_TYPE {
  "SET_USERS_LIST" = "SET_USERS_LIST",
  "SET_EDIT_MODE_ON" = "SET_EDIT_MODE_ON",
  "SET_EDIT_MODE_OFF" = "SET_EDIT_MODE_OFF",
  "TOGGLE_DARK_MODE" = "TOGGLE_DARK_MODE",
  "TOGGLE_LIKE" = "TOGGLE_LIKE",
  "UPDATE_USER_INFO" = "UPDATE_USER_INFO",
  "DELETE_USER" = "DELETE_USER",
}

export const setUsersListAction = (payload: UserResponseWithLikes[]) => ({
  type: ACTION_TYPE.SET_USERS_LIST,
  payload,
});

export const setEditModeOn = (payload: UserResponseWithLikes) => ({
  type: ACTION_TYPE.SET_EDIT_MODE_ON,
  payload,
});

export const setEditModeOff = () => ({
  type: ACTION_TYPE.SET_EDIT_MODE_OFF,
});

export const toggleLikeAction = (payload: UserResponseWithLikes["id"]) => ({
  type: ACTION_TYPE.TOGGLE_LIKE,
  payload,
});

export const updateUserAction = (
  payload: Partial<UserResponseWithLikes> & { id: UserResponseWithLikes["id"] }
) => ({
  type: ACTION_TYPE.UPDATE_USER_INFO,
  payload,
});

export const deleteUserAction = (payload: UserResponseWithLikes["id"]) => ({
  type: ACTION_TYPE.DELETE_USER,
  payload,
});
