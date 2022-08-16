import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { dummyFetchedUsers, dummyStore } from "../../data/dummyData";
import { setUsersListAction } from "../../store/actions";
import { storeContext } from "../../store/store-context";
import useGetUsersLists from "../useGetUsersLists";
import * as dep from "../useLocalStorage";

// Add service Mocked to mock Api Responses

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.json(dummyFetchedUsers));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Fetching users list from server", () => {
  test("Should fetch users From API if there is no usersList in localStorage", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <storeContext.Provider value={dummyStore}>
        {children}
      </storeContext.Provider>
    );

    const fetchedDataWithLikes = dummyFetchedUsers.map((data) => ({
      ...data,
      hasLike: false,
    }));

    // ACT
    const { waitForNextUpdate } = renderHook(() => useGetUsersLists(), {
      wrapper,
    });

    await waitForNextUpdate();

    // ASSERT
    expect(dummyStore.dispatch).toHaveBeenCalled();
    expect(dummyStore.dispatch).toHaveBeenCalledTimes(1);
    expect(dummyStore.dispatch).toHaveBeenCalledWith(
      setUsersListAction(fetchedDataWithLikes)
    );
  });

  test("Should fetch users From API if usersList in localStorage has zero length", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <storeContext.Provider value={dummyStore}>
        {children}
      </storeContext.Provider>
    );

    const fetchedDataWithLikes = dummyFetchedUsers.map((data) => ({
      ...data,
      hasLike: false,
    }));

    // ACT
    const { waitForNextUpdate } = renderHook(() => useGetUsersLists(), {
      wrapper,
    });

    await waitForNextUpdate();

    // ASSERT
    expect(dummyStore.dispatch).toHaveBeenCalled();
    expect(dummyStore.dispatch).toHaveBeenCalledTimes(1);
    expect(dummyStore.dispatch).toHaveBeenCalledWith(
      setUsersListAction(fetchedDataWithLikes)
    );
  });
});

describe("Fetching usersList from localStorage", () => {
  test("Should get users From localStorage if userList is exist", async () => {
    // Arrange
    const fetchedDataWithLikes = dummyFetchedUsers
      .map((data) => ({
        ...data,
        hasLike: false,
      }))
      .slice(0, 1);

    // mocking useLocalStorage to mimic the behavior of getting usersList from localStorage
    jest
      .spyOn(dep, "default")
      .mockImplementation(() => [fetchedDataWithLikes, jest.fn()]);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <storeContext.Provider value={dummyStore}>
        {children}
      </storeContext.Provider>
    );

    // ACT
    const { waitFor } = renderHook(() => useGetUsersLists(), {
      wrapper,
    });

    //  wait until dispatch execute with localStorage data
    await waitFor(() =>
      expect(dummyStore.dispatch).toHaveBeenCalledWith(
        setUsersListAction(fetchedDataWithLikes)
      )
    );
  });
});
