import React from "react";
import UsersList from "./components/UsersList";
import useGetUsersLists from "./hooks/useGetUsersLists";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./styles/theme";
import EditModel from "./components/EditModal";

const theme = getTheme();

function App() {
  const [usersList, isLoading, errorMsg] = useGetUsersLists();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UsersList data={usersList} isLoading={isLoading} error={errorMsg} />
      <EditModel />
    </ThemeProvider>
  );
}

export default App;
