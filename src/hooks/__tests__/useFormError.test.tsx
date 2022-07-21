import { renderHook } from "@testing-library/react";
import useFormError from "../useFormError";

test("should return error message if there is an empty value in form inputs", () => {
  const dummyFormInputValues = {
    name: "zakaria",
    phone: "011",
    website: "hola.com",
    email: "  ",
  };
  const { result } = renderHook(() => useFormError(dummyFormInputValues));

  expect(result.current[0]).toBe("All Input Fields are required");
});

test("should return null for error if there is no empty value", () => {
  const dummyFormInputValues = {
    name: "zakarai",
    phone: "011",
    website: "website.com",
    email: "zakria@website.com",
  };
  const { result } = renderHook(() => useFormError(dummyFormInputValues));

  expect(result.current[0]).toBe(null);
});
