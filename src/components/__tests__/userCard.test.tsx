import { render, screen } from "@testing-library/react";
import UserCard from "../UserCard";
import { dummyCurrentUser } from "../../data/dummyData";

describe("UserCard", () => {
  test("should render user image", () => {
    render(<UserCard user={dummyCurrentUser} />);

    expect(screen.getByAltText(dummyCurrentUser.name)).toBeInTheDocument();
  });

  test("should render user name and info", () => {
    render(<UserCard user={dummyCurrentUser} />);

    expect(screen.getByText(dummyCurrentUser.name)).toBeInTheDocument();
    expect(screen.getByTestId("userInfo")).toBeInTheDocument();
  });

  test("should render Action btns", () => {
    render(<UserCard user={dummyCurrentUser} />);

    expect(screen.getByTestId("actionBtns")).toBeInTheDocument();
  });

  test("should render filledLike btn if user hasLike is true", () => {
    // arrange
    dummyCurrentUser.hasLike = true;
    // act
    render(<UserCard user={dummyCurrentUser} />);

    // assert
    expect(screen.getByTestId("liked")).toBeInTheDocument();
    expect(screen.queryByTestId("notLiked")).not.toBeInTheDocument();
  });

  test("should render outlinedLike btn if user hasLike is false", () => {
    // arrange
    dummyCurrentUser.hasLike = false;
    // act
    render(<UserCard user={dummyCurrentUser} />);

    // assert
    expect(screen.getByTestId("notLike")).toBeInTheDocument();
    expect(screen.queryByTestId("liked")).not.toBeInTheDocument();
  });
});
