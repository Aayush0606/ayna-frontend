import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import { MessageContextProvider } from './context/messageContext.jsx';
import { UserContextProvider } from './context/userContext.jsx';
import ProtectedRoutes from './utils/ProtectdRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<ProtectedRoutes/>}>
        <Route
          path="/home"
          lazy={async () => {
            const HomePage = await import("./pages/HomePage.jsx");
            return { Component: HomePage.default };
          }}
        />
      </Route>
      <Route
        path="/login"
        lazy={async () => {
          const HomePage = await import("./pages/LoginPage.jsx");
          return { Component: HomePage.default };
        }}
      />
      <Route
        path="/signup"
        lazy={async () => {
          const HomePage = await import("./pages/SignupPage.jsx");
          return { Component: HomePage.default };
        }}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <MessageContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </MessageContextProvider>
  </UserContextProvider>
);