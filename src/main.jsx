import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from './authContext'
import CategoryDisplay from './components/CategoryDisplay.jsx'
import Root from './routes/root.jsx'
import Home from './routes/home.jsx'
import Events from './routes/events.jsx'
import Story from './routes/story.jsx'
import Contact from './routes/contact.jsx'
import Donate from './routes/donate.jsx'
import UserAuth from './routes/user-auth.jsx'
import Admin from './routes/admin.jsx'
import ErrorPage from "./error-page"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: "home",
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: "events/*",
        element: <Events />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":categoryName",
            element: <CategoryDisplay />,
            errorElement: <ErrorPage />
          }
        ]
      },
      {
        path: "story",
        element: <Story />,
        errorElement: <ErrorPage />
      },
      {
        path: "contact",
        element: <Contact />,
        errorElement: <ErrorPage />
      },
      {
        path: "donate",
        element: <Donate />,
        errorElement: <ErrorPage />
      },
      {
        path: "user-auth",
        element: <UserAuth />,
        errorElement: <ErrorPage />
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <ErrorPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
