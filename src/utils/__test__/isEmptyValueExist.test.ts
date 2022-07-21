import { isEmptyValueExist } from "../isEmptyValueExist";

test("should return true if any object value is empty", () => {
  const isEmpty = isEmptyValueExist({ name: "zakaria", phone: "" });
  expect(isEmpty).toBeTruthy();
});
test("should return false if all object values are filled", () => {
  const isEmpty = isEmptyValueExist({ name: "zakaria", phone: "011" });
  expect(isEmpty).toBeFalsy();
});

test("should return true if any value have empty spaces only", () => {
  const isEmpty = isEmptyValueExist({ name: "zakaria", phone: "  " });
  expect(isEmpty).toBeTruthy();
});
