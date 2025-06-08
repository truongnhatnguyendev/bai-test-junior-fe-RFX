import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import { NotFound } from "./pages/notFound";
import { WorkPackagesPage } from "./pages/estimator";
import { TicketDetailPage } from "./pages/projects/ticketDetail";
import { UserManagementPage } from "./pages/userManagement";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/projects" />,
      },
      {
        path: "/projects",
        element: <TicketDetailPage />,
      },
      {
        path: "/estimator",
        element: <WorkPackagesPage />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/user-management",
    element: <UserManagementPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
