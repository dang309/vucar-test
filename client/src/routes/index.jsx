import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// import RoleBasedGuard from 'src/guards/RoleBasedGuard';
// components
import LoadingScreen from "src/components/LoadingScreen";
import AuthGuard from "src/guards/AuthGuard";
// guards
import GuestGuard from "src/guards/GuestGuard";
import AuthLayout from "src/layouts/AuthLayout";
// layouts
import ManagementLayout from "src/layouts/ManagementLayout";

const Loadable = (Component) => (props) => {
  const pathname = window.location.href;
  const isDashboard = pathname.includes("dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

// user
const UserManagement = Loadable(
  lazy(() => import("src/pages/User/Management"))
);
const UserForm = Loadable(lazy(() => import("src/pages/User/Form")));

//
const Dashboard = Loadable(lazy(() => import("src/pages/Dashboard")));

// auth
const SignIn = Loadable(lazy(() => import("src/pages/Auth/SignIn")));

// 404
const ERROR404 = Loadable(lazy(() => import("src/pages/Page404")));

// ----------------------------------------------------------------------

const Router = () => {
  return useRoutes([
    {
      path: "/admin",
      element: (
        <AuthGuard>
          <ManagementLayout />,
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "cars",
          element: <UserManagement />,
        },
        {
          path: "cars/create",
          element: <UserForm />,
        },
        {
          path: "cars/edit/:id",
          element: <UserForm />,
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        {
          element: <Navigate to="/auth/signin" />,
          index: true,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
      ],
    },

    {
      path: "/",
      element: <Navigate to="/admin/dashboard" replace />,
    },

    {
      path: "/404",
      element: <ERROR404 />,
    },

    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ]);
};

export default Router;
