import React from "react";
import { createGlobalStyle } from "styled-components";

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
  return (
    <>
      <GlobalStyle />
      <div>hello from another hand</div>
    </>
  );
}

export default App;
