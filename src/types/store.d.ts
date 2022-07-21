import { ACTION_TYPE } from "../store/store-context";

export type StoreType = {
  users: UserResponseWithLikes[] | null;
  editMode: {
    mode: "ON" | "OFF";
    currentInfo: UserResponseWithLikes | null;
  };
};

export type storeAction = {
  type: ACTION_TYPE.SET_USERS_LIST | ACTION_TYPE.TOGGLE_EDIT_MODE;
  payload: any;
};

export type contextValueTypes = {
  state: StoreType;
  dispatch: React.Dispatch<storeAction>;
};
export interface UserResponseWithLikes extends UserResponse {
  hasLike: boolean;
}

export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
