import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useLocalStorage from "../useLocalStorage";

const localStorageMock = (() => {
  let store: Record<string, any> = {};
  return {
    s: "SD",
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: any) {
      store[key] = value.toString();
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

const MockedGetItem = jest.spyOn(window.localStorage, "getItem");
const mockedSetItem = jest.spyOn(window.localStorage, "setItem");

test("userList should initialize with null value if there is no value in localStorage", () => {
  const { result } = renderHook(() => useLocalStorage("usersList", null));

  expect(result.current[0]).toBeNull();
  expect(MockedGetItem).toHaveBeenCalled();
});

test("should get userList value from localStorage instead using initial value", () => {
  // set dummy data to usersList in localStorage
  const dummyData = [{ name: "ahmed" }, { name: "zakaria" }];
  localStorage.setItem("usersList", JSON.stringify(dummyData));

  // ACT
  const { result } = renderHook(() => useLocalStorage("usersList", null));

  //Asser
  expect(MockedGetItem).toHaveBeenCalled();
  expect(result.current[0]).toEqual(dummyData);
});

test("should set a new value to localStorage usersList key", () => {
  // set dummy data to usersList in localStorage
  const dummyData = [{ name: "ahmed" }];
  localStorage.setItem("usersList", JSON.stringify(dummyData));

  // ACT
  const { result } = renderHook(() => useLocalStorage("usersList", dummyData));

  // add new piece of data to localStorage
  act(() => {
    result.current[1]([...dummyData, { name: "ali" }]);
  });

  //Asser
  expect(mockedSetItem).toHaveBeenCalled();
  expect(mockedSetItem).toHaveBeenCalledWith(
    "usersList",
    JSON.stringify([...dummyData, { name: "ali" }])
  );
  expect(result.current[0]).toEqual([...dummyData, { name: "ali" }]);
});
