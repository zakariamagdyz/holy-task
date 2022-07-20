import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderHook } from "@testing-library/react-hooks";
import useGetUsersLists from "../useGetUsersLists";
import { storeContext } from "../../store/store-context";
import { setUsersListAction } from "../../store/actions";
import * as dep from "../useLocalStorage";
import React from "react";

const DummyDataToFetch = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

// Add service Mocked to mock Api Responses

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(ctx.json(DummyDataToFetch));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Should fetch users From API if there is no usersList in localStorage", async () => {
  // Arrange
  const dummyStore = {
    state: { users: null, editMode: { mode: "OFF", currentInfo: null } },
    dispatch: jest.fn(),
  };
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <storeContext.Provider value={dummyStore}>{children}</storeContext.Provider>
  );

  const fetchedDataWithLikes = DummyDataToFetch.map((data) => ({
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

test("Should get users From localStorage if userList is exist", async () => {
  const fetchedDataWithLikes = DummyDataToFetch.map((data) => ({
    ...data,
    hasLike: false,
  })).slice(0, 1);
  // Arrange
  const dummyStore = {
    state: {
      users: null,
      editMode: { mode: "OFF", currentInfo: null },
    },
    dispatch: jest.fn(),
  };
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <storeContext.Provider value={dummyStore}>{children}</storeContext.Provider>
  );

  // mocking useLocalStorage to mimic the behavior of getting usersList from localStorage

  jest
    .spyOn(dep, "default")
    .mockImplementation(() => [fetchedDataWithLikes, () => {}]);
  //@ts-ignore
  // ACT
  const { result, waitFor } = renderHook(() => useGetUsersLists(), {
    wrapper,
  });

  //  wait until dispatch execute with localStorage data
  await waitFor(() => true);

  console.log(result.current);

  // ASSERT
  expect(dummyStore.dispatch).toHaveBeenCalled();
  expect(dummyStore.dispatch).toHaveBeenCalledTimes(1);
  expect(dummyStore.dispatch).toHaveBeenCalledWith(
    setUsersListAction(fetchedDataWithLikes)
  );
});
