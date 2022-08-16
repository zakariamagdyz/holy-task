import { screen, render } from "@testing-library/react";
import UsersList from "../UsersList";
import { dummyFetchedUsersWithLike } from "../../data/dummyData";

describe("UsersList", () => {
  test("should render 2 Card components", () => {
    render(
      <UsersList
        data={dummyFetchedUsersWithLike}
        isLoading={false}
        error={null}
      />
    );

    expect(screen.getAllByRole("article").length).toBe(2);
  });
});
