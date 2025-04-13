import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { UpdatePassword } from "./page/UpdatePassword";

// 路由
const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "update_password",
        element: <UpdatePassword />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<RouterProvider router={router} />);
