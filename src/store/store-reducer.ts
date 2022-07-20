import { StoreType, storeAction } from "../types/store";
import { ACTION_TYPE } from "./actions";
import { deleteUser, toggleLike, updateUserInfo } from "./utils";

const storeReducer = (
  store: StoreType,
  action: storeAction
): StoreType | never => {
  switch (action.type) {
    case ACTION_TYPE.SET_USERS_LIST:
      return { ...store, users: action.payload };
    case ACTION_TYPE.SET_EDIT_MODE_ON:
      return {
        ...store,
        editMode: { mode: "ON", currentInfo: action.payload },
      };
    case ACTION_TYPE.SET_EDIT_MODE_OFF:
      return {
        ...store,
        editMode: { mode: "OFF", currentInfo: null },
      };
    case ACTION_TYPE.TOGGLE_LIKE:
      return { ...store, users: toggleLike(store, action) };
    case ACTION_TYPE.UPDATE_USER_INFO:
      return { ...store, users: updateUserInfo(store, action) };
    case ACTION_TYPE.DELETE_USER:
      return { ...store, users: deleteUser(store, action) };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default storeReducer;
