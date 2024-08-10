import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import { HomePage } from './pages/mainPage/mainPage.tsx'
import { LandingPage } from './pages/authentication/landingPage.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/main",
        element: <HomePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
