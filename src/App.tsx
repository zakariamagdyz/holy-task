import React from "react";
import Users from "./components/Users";
import useGetUsersLists from "./hooks/useGetUsersLists";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./styles/theme";

const theme = getTheme();

function App() {
  const [userList, isLoading, errorMsg] = useGetUsersLists();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Users data={userList} isLoading={isLoading} error={errorMsg} />
    </ThemeProvider>
  );
}

export default App;
