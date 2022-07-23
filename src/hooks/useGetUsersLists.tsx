import { useEffect, useState } from "react";
import { setUsersListAction } from "../store/actions";
import { useDispatch, useUsersList } from "../store/store-context";
import { UserResponse } from "../types/store";
import useLocalStorage from "./useLocalStorage";

const useGetUsersLists = () => {
  const UserList = useUsersList();
  const dispatch = useDispatch();
  // Initiate userList with null value
  const [LSUserList] = useLocalStorage("usersList", UserList);

  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check if userList dosen't exit or has empty values to fetch it from API and set it on global store
    if (!LSUserList || LSUserList.length === 0) {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = (await res.json()) as UserResponse[];
          // add like capability to userList
          const userListsWithHasLike = data.map((user) => ({
            ...user,
            hasLike: false,
          }));

          dispatch(setUsersListAction(userListsWithHasLike));

          // update userList fetching states
          setErrorMsg(null);
        } catch (error) {
          if (error instanceof Error) {
            setErrorMsg(error.message);
          }
        } finally {
          setLoading(false);
        }
      })();
    } else {
      // if it exists set it on global store
      dispatch(setUsersListAction(LSUserList));
    }
    // eslint-disable-next-line
  }, []);

  return [UserList, isLoading, errorMsg] as const;
};

export default useGetUsersLists;
