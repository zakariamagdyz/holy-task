import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundry from "./components/ErrorBoundry";
import StoreProvider from "./store/store-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ErrorBoundry>
        <App />
      </ErrorBoundry>
    </StoreProvider>
  </React.StrictMode>
);
