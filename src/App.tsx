import React, { useMemo } from "react";
import UsersList from "./components/UsersList";
import useGetUsersLists from "./hooks/useGetUsersLists";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./styles/theme";
import EditModel from "./components/EditModal";
import { useDarkMode } from "./store/store-context";
import Header from "./components/Header";

function App() {
  const [usersList, isLoading, errorMsg] = useGetUsersLists();
  const darkMode = useDarkMode();
  // create memoize version from theme to prevent reevaluate getTheme fn if state changes
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <UsersList data={usersList} isLoading={isLoading} error={errorMsg} />
      <EditModel />
    </ThemeProvider>
  );
}

export default App;
