import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import AdminRoute from "./admin_pages/adminRoute.jsx";

// Website Pages
import Home from "./pages/home.jsx";
import Adopt from "./pages/adopt.jsx";
import Support from "./pages/support.jsx";
import Latest from "./pages/latest.jsx";
import About from "./pages/about.jsx";
import Account from "./pages/account.jsx";

// Admin Controls
import AdoptMe from "./admin_pages/adoptme.jsx";
import AdoptMeList from "./admin_pages/adoptmeList.jsx";
import AnnouncementForm from "./admin_pages/AnnouncementForm.jsx";

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
        element: <AdminRoute><AdoptMe /></AdminRoute>,
      },
      {
        path: "catrecord",
        element: <AdminRoute><AdoptMeList /></AdminRoute>,
      },
      {
        path: "edit/:id",
        element: <AdminRoute><AdoptMe /></AdminRoute>,
      },
      {
        path: "announcementForm",
        element: <AdminRoute><AnnouncementForm /></AdminRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);