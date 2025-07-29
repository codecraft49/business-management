import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ForgotPass from "layouts/authentication/reset-password/cover";
import ResetPass from "layouts/authentication/reset-password/cover/ResetPassword";
import Warehouse from "layouts/warehouse/Warehouse";
import Item from "layouts/item/Item";
import Users from "layouts/addUsers/addUsers";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ProtectedRoute from "./ProtectedRoute";

// icons
import Icon from "@mui/material/Icon";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ADMIN = [1];
const ADMIN_AND_USER = [1, 2];

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <ProtectedRoute allowedRoles={ADMIN}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Warehouse",
    key: "Warehouse",
    icon: <WarehouseIcon />,
    route: "/warehouse",
    component: (
      <ProtectedRoute allowedRoles={ADMIN}>
        <Warehouse />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Item",
    key: "Item",
    icon: <TouchAppIcon />,
    route: "/item",
    component: (
      <ProtectedRoute allowedRoles={ADMIN}>
        <Item />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Add Users",
    key: "Users",
    icon: <PersonAddIcon />,
    route: "/users",
    component: (
      <ProtectedRoute allowedRoles={ADMIN}>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: (
      <ProtectedRoute allowedRoles={ADMIN}>
        <Tables />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: (
      <ProtectedRoute allowedRoles={ADMIN}>
        <Billing />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: (
      <ProtectedRoute allowedRoles={ADMIN_AND_USER}>
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: (
      <ProtectedRoute allowedRoles={ADMIN_AND_USER}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    type: "nocollapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: (
      <PublicOnlyRoute>
        <SignIn />
      </PublicOnlyRoute>
    ),
  },
  {
    type: "nocollapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: (
      <PublicOnlyRoute>
        <SignUp />
      </PublicOnlyRoute>
    ),
  },
  {
    type: "nocollapse",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/reset-password/cover",
    component: <ForgotPass />,
  },
  {
    type: "nocollapse",
    name: "Reset Password",
    key: "ResetPassword",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/reset-password/cover/ResetPassword",
    component: <ResetPass />,
  },
];

export default routes;
