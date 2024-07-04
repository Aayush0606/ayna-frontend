import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route
        path=""
        lazy={async () => {
          const HomePage = await import("./pages/HomePage/HomePage");
          return { Component: HomePage.default };
        }}
      /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);