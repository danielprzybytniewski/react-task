import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "@/components/Layout";
import UsersListPage from "@/pages/UsersListPage";
import AddUserPage from "@/pages/AddUserPage";
import UserDetailPage from "@/pages/UserDetailPage";
import { UsersProvider } from "@/context/UsersContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: "users",
        element: <UsersListPage />,
      },
      {
        path: "users/add",
        element: <AddUserPage />,
      },
      {
        path: "users/:id",
        element: <UserDetailPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <UsersProvider>
      <RouterProvider router={router} />
    </UsersProvider>
  );
}
