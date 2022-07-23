import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useLocalStorage from "../useLocalStorage";
import { dummyFetchedUsers, dummyCurrentUser } from "../../data/dummyData";

const localStorageMock = (() => {
  let store: Record<string, any> = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: any) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

//const mockedSetItem = jest.spyOn(window.localStorage, "setItem"); //

describe("useLocalStorage", () => {
  test("userList should initialize with null value if there is no value in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("usersList", null));

    expect(result.current[0]).toBeNull();
  });

  test("should get userList value from localStorage instead of using initial value", () => {
    // set dummy data to usersList in localStorage
    localStorage.setItem("usersList", JSON.stringify(dummyFetchedUsers));

    // ACT
    const { result } = renderHook(() => useLocalStorage("usersList", null));

    //Asser
    expect(result.current[0]).toEqual(dummyFetchedUsers);
  });

  test("should set a new value to localStorage usersList key", () => {
    // set dummy data to usersList in localStorage
    localStorage.setItem("usersList", JSON.stringify(dummyFetchedUsers));
    const mockedSetItem = jest.spyOn(window.localStorage, "setItem");

    // ACT
    const { result } = renderHook(() =>
      useLocalStorage("usersList", dummyFetchedUsers)
    );

    // add new piece of data to localStorage
    act(() => {
      result.current[1]([...dummyFetchedUsers, dummyCurrentUser]);
    });

    //Assert
    // should calll setItem fn to save new value to local storage
    expect(mockedSetItem).toHaveBeenCalled();
    expect(mockedSetItem).toHaveBeenCalledWith(
      "usersList",
      JSON.stringify([...dummyFetchedUsers, dummyCurrentUser])
    );
    expect(result.current[0]).toEqual([...dummyFetchedUsers, dummyCurrentUser]);
  });
});
