import Register from "../pages/Register";
import Login from "../pages/Login";
import ConfirmAccount from "../pages/ConfirmAccount";
import Home from "../pages/Home";
import Management from "../pages/Admin/Management";
export const routes = [
  { path: "/", Component: Home },
  { path: "/register", Component: Register },
  { path: "/login", Component: Login },
  { path: "/confirm-account/:userId", Component: ConfirmAccount },

  { path: "/management", Component: Management, isProtected: true },
];
