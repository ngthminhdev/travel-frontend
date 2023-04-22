import Register from "../pages/Register"
import Login from "../pages/Login";
import ConfirmAccount from "../pages/ConfirmAccount";
export const routes = [
    {path: '/register', Component: Register},
    {path: '/login', Component: Login},
    {path: '/confirm-account/:userId', Component: ConfirmAccount},
]