import Register from "../pages/Register";
import Login from "../pages/Login";
import ConfirmAccount from "../pages/ConfirmAccount";
import Home from "../pages/Home";
import Management from "../pages/Admin/Management";
import TourDetai from "../pages/TourDetail";
import TourPayment from "../pages/TourPayment";
export const routes = [
  { path: "/", Component: Home },
  { path: "/register", Component: Register },
  { path: "/login", Component: Login },
  { path: "/confirm-account/:userId", Component: ConfirmAccount },

  { path: "/tour-detail/:tourId", Component: TourDetai },
  { path: "/tour-payment/:tourId", Component: TourPayment },

  { path: "/management", Component: Management, isProtected: true },
];
