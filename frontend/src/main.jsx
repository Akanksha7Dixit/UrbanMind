import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import ThemeProvider from "./app/providers/ThemeProvider";
import QueryProvider from "./app/providers/QueryProvider";
import AppRouter from "./app/router/AppRouter";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);