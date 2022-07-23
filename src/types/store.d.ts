import { ACTION_TYPE } from "../store/actions";

export interface StoreType {
  users: UserResponseWithLikes[] | null;
  editMode: {
    mode: "ON" | "OFF";
    currentInfo: UserResponseWithLikes | null;
  };
  darkMode: "ON" | "OFF";
}

export interface storeAction {
  type: keyof typeof ACTION_TYPE;
  payload: any;
}

export interface contextValueTypes {
  state: StoreType;
  dispatch: React.Dispatch<storeAction>;
}
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
