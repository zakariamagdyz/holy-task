import { render, screen } from "@testing-library/react";
import { UserResponseWithLikes } from "../../types/store";
import UserCard from "../UserCard";

const dummyData = {
  id: 1,
  name: "zakaria",
  phone: "011",
  email: "zakaria@gmail.com",
  website: "http://www.zakaria.com",
  hasLike: false,
} as unknown as UserResponseWithLikes;

test("should render user image", () => {
  render(<UserCard user={dummyData} />);

  const userImage = screen.getByAltText(dummyData.name);

  expect(userImage).toBeInTheDocument();
});

test("should render user name and info", () => {
  render(<UserCard user={dummyData} />);
  const userTitle = screen.getByText(dummyData.name);
  const userInfo = screen.getByTestId("userInfo");

  expect(userTitle).toBeInTheDocument();
  expect(userInfo).toBeInTheDocument();
});

test("should render Action btns", () => {
  render(<UserCard user={dummyData} />);
  const actionBtns = screen.getByTestId("actionBtns");

  expect(actionBtns).toBeInTheDocument();
});

test("should render filledLike btn if user hasLike is true", () => {
  // arrange
  dummyData.hasLike = true;
  // act
  render(<UserCard user={dummyData} />);
  const filledLike = screen.queryByTestId("liked");
  const outlinedLike = screen.queryByTestId("notLiked");
  // assert
  expect(filledLike).toBeInTheDocument();
  expect(outlinedLike).not.toBeInTheDocument();
});

test("should render outlinedLike btn if user hasLike is false", () => {
  // arrange
  dummyData.hasLike = false;
  // act
  render(<UserCard user={dummyData} />);
  const filledLike = screen.queryByTestId("liked");
  const outlinedLike = screen.queryByTestId("notLike");
  // assert
  expect(outlinedLike).toBeInTheDocument();
  expect(filledLike).not.toBeInTheDocument();
});
