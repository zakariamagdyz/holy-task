import React, { useEffect, useReducer } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import useLocalStorage from "../hooks/useLocalStorage";
import { contextValueTypes, StoreType } from "../types/store";
import storeReducer from "./store-reducer";

export const storeContext = createContext({} as contextValueTypes);

// Initial Store
const initialStore: StoreType = {
  users: null,
  editMode: {
    mode: "OFF",
    currentInfo: null,
  },
};

// Context Provider

type Props = {
  children: React.ReactNode;
};
const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialStore);
  const [, setUsersList] = useLocalStorage("usersList", state.users);

  useEffect(() => {
    //  save users List to local storage whenever data changes
    if (state.users) {
      setUsersList(state.users);
    }
  }, [state.users, setUsersList]);
  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;

// selectors

export const useUsersList = () =>
  useContextSelector(storeContext, (store) => store.state.users);

export const useEditMode = () =>
  useContextSelector(storeContext, (store) => store.state.editMode);

export const useDispatch = () =>
  useContextSelector(storeContext, (store) => store.dispatch);
