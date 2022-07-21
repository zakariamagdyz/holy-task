import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useLocalStorage from "../useLocalStorage";

test("userList should initialize with null value if there is no value in localStorage", () => {
  const { result } = renderHook(() => useLocalStorage("usersList", null));

  expect(result.current[0]).toBeNull();
});

test("should get userList value from localStorage instead using initial value", () => {
  // set dummy data to usersList in localStorage
  const dummyData = [{ name: "ahmed" }, { name: "zakaria" }];
  localStorage.setItem("usersList", JSON.stringify(dummyData));
  // mocked fn after using it

  // ACT
  const { result } = renderHook(() => useLocalStorage("usersList", null));

  //Asser
  expect(result.current[0]).toEqual(dummyData);
});

test("should set a new value to localStorage usersList key", () => {
  // set dummy data to usersList in localStorage
  const dummyData = [{ name: "ahmed" }];
  localStorage.setItem("usersList", JSON.stringify(dummyData));

  const mockedSetItem = jest.spyOn(window.localStorage, "setItem");

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
