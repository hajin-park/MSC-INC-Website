import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from './utils/authContext'
import HomeDashboard from './components/AdminPage/HomeDashboard.jsx'
import EventDashboard from './components/AdminPage/EventDashboard.jsx'
import StoryDashboard from './components/AdminPage/StoryDashboard.jsx'
import ContactDashboard from './components/AdminPage/ContactDashboard.jsx'
import DonateDashboard from './components/AdminPage/DonateDashboard.jsx'
import FooterDashboard from './components/AdminPage/FooterDashboard.jsx'
import CategoryDisplay from './components/EventPage/CategoryDisplay.jsx'
import Root from './routes/root.jsx'
import Home from './routes/home.jsx'
import Events from './routes/events.jsx'
import Story from './routes/story.jsx'
import Contact from './routes/contact.jsx'
import Donate from './routes/donate.jsx'
import Admin from './routes/admin.jsx'
import ErrorPage from "./utils/error-page"
import "./index.css" // Do not remove this file

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
        path: "admin/*",
        element: <Admin />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "home",
            element: <HomeDashboard />,
            errorElement: <ErrorPage />
          },
          {
            path: "events",
            element: <EventDashboard />,
            errorElement: <ErrorPage />
          },
          {
            path: "story",
            element: <StoryDashboard />,
            errorElement: <ErrorPage />
          },
          {
            path: "contact",
            element: <ContactDashboard />,
            errorElement: <ErrorPage />
          },
          {
            path: "donate",
            element: <DonateDashboard />,
            errorElement: <ErrorPage />
          },
          {
            path: "footer",
            element: <FooterDashboard />,
            errorElement: <ErrorPage />
          },
        ]
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
