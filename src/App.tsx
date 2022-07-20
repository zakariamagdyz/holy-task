import React from "react";
import { createGlobalStyle } from "styled-components";
import useGetUsersLists from "./hooks/useGetUsersLists";
import useLocalStorage from "./hooks/useLocalStorage";

// Global styles

const GlobalStyle = createGlobalStyle`
  *,*::after,*::before{
    padding:0;
    margin:0;
    box-sizing: inherit;
  }

  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }
`;

function App() {
  const [userList, isLoading, errorMsg] = useGetUsersLists();
  console.log(userList);
  if (isLoading) return <div>LOOOOOOooooooooOOOOOing</div>;
  return (
    <>
      <GlobalStyle />
      <div>hello from another hand</div>
    </>
  );
}

export default App;
