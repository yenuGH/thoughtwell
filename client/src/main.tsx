import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import { MainPage } from './pages/mainPage/mainPage.tsx'
import { LandingPage } from './pages/authentication/landingPage.tsx'
import { DepositPage } from './pages/deposit/depositPage.tsx'
import { WithdrawPage } from './pages/withdraw/withdrawPage.tsx'
import { ThoughtDetailsPage } from './pages/withdraw/thoughtDetailsPage.tsx'

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
        element: <MainPage />,
      },
      {
        path: "/deposit",
        element: <DepositPage />,
      },
      {
        path: "/withdraw",
        element: <WithdrawPage />,
      },
      {
        path: "/thought/:thoughtId",
        element: <ThoughtDetailsPage />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
