import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";

// Website Pages
import Home from "./pages/home.jsx";
import Adopt from "./pages/adopt.jsx";
import Support from "./pages/support.jsx";
import Latest from "./pages/latest.jsx";
import About from "./pages/about.jsx";
import Account from "./pages/account.jsx";

// Admin Controls
import AdminRoute from "./admin_pages/adminRoute.jsx";
import AdoptMe from "./admin_pages/adoptme.jsx";
import AdoptMeList from "./admin_pages/adoptmeList.jsx";
import AnnouncementForm from "./admin_pages/announcementForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "adopt",
        element: <Adopt />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "latest",
        element: <Latest />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "adoptme",
        element: <AdoptMe />,
      },
      {
        path: "catrecord",
        element: <AdoptMeList />,
      },
      {
        path: "edit/:id",
        element: <AdoptMe />,
      },
      {
        path: "announcementForm",
        element: <AnnouncementForm />,
      },
      // Admin routes - protected
      {
        element: <AdminRoute />,
        children: [
          {
            path: "adoptme",
            element: <AdoptMe />,
          },
          {
            path: "catrecord",
            element: <AdoptMeList />,
          },
          {
            path: "edit/:id",
            element: <AdoptMe />,
          },
          {
            path: "announcementForm",
            element: <AnnouncementForm />,
          },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);