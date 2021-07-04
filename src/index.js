import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TaskContextProvider } from "./context/task-context";
import { UserContextProvider } from "./context/users-context";
import { AssigneContextProvider } from "./context/assign-context";

ReactDOM.render(
  <AssigneContextProvider>
    <TaskContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </TaskContextProvider>
  </AssigneContextProvider>,
  document.getElementById("root")
);
