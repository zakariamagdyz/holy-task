import { renderHook } from "@testing-library/react";
import useFormError from "../useFormError";
import { dummyFormValues } from "../../data/dummyData";

let generateDummyFormValues: EditState;

describe("useFormError", () => {
  beforeEach(() => {
    // regenerate dummy value after each test to  not mutate dummy data between tests
    generateDummyFormValues = { ...dummyFormValues };
  });
  test("should return error message if there is an empty value in form inputs", () => {
    // mimic empty value
    generateDummyFormValues.email = "";

    const { result } = renderHook(() => useFormError(generateDummyFormValues));
    console.log(generateDummyFormValues);

    expect(result.current[0]).toBe("All input fields are required");
  });

  test("should return null for error if there is no empty value", () => {
    const { result } = renderHook(() => useFormError(generateDummyFormValues));

    expect(result.current[0]).toBe(null);
  });
});
