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

// sface-data
const SFaceDataPersonManagement = Loadable(
  lazy(() => import("src/pages/SFaceData/Person/Management"))
);
const SFaceDataPersonForm = Loadable(
  lazy(() => import("src/pages/SFaceData/Person/Form"))
);

const SFaceDataModelManagement = Loadable(
  lazy(() => import("src/pages/SFaceData/Model/Management"))
);
const SFaceDataModelForm = Loadable(
  lazy(() => import("src/pages/SFaceData/Model/Form"))
);

const SFaceDataFaceManagement = Loadable(
  lazy(() => import("src/pages/SFaceData/Face/Management"))
);
const SFaceDataFaceForm = Loadable(
  lazy(() => import("src/pages/SFaceData/Face/Form"))
);

const SFaceDataTaskManagement = Loadable(
  lazy(() => import("src/pages/SFaceData/Task/Management"))
);

// user
const UserManagement = Loadable(
  lazy(() => import("src/pages/User/Management"))
);
const UserForm = Loadable(lazy(() => import("src/pages/User/Form")));

// system
const SystemManagement = Loadable(
  lazy(() => import("src/pages/System/Management"))
);
const SystemForm = Loadable(lazy(() => import("src/pages/System/Form")));

// asset
const AssetManagement = Loadable(
  lazy(() => import("src/pages/Asset/Management"))
);

//
const Dashboard = Loadable(lazy(() => import("src/pages/Dashboard")));

// web-master
const WebMasterSettingManagement = Loadable(
  lazy(() => import("src/pages/WebMaster/Setting/Managament"))
);
const WebMasterSettingForm = Loadable(
  lazy(() => import("src/pages/WebMaster/Setting/Form"))
);

const WebMasterBackupManagement = Loadable(
  lazy(() => import("src/pages/WebMaster/Backup/Management"))
);

const WebMasterServerStatusManagement = Loadable(
  lazy(() => import("src/pages/WebMaster/ServerStatus/Management"))
);

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
          path: "users",
          element: <UserManagement />,
        },
        {
          path: "users/create",
          element: <UserForm />,
        },
        {
          path: "users/edit/:id",
          element: <UserForm />,
        },

        {
          path: "system",
          element: <SystemManagement />,
        },
        {
          path: "system/create",
          element: <SystemForm />,
        },
        {
          path: "system/edit/:id",
          element: <SystemForm />,
        },

        {
          path: "assets",
          element: <AssetManagement />,
        },

        {
          path: "sface-data/models",
          element: <SFaceDataModelManagement />,
        },

        {
          path: "sface-data/models/edit/:id",
          element: <SFaceDataModelForm />,
        },

        {
          path: "sface-data/people",
          element: <SFaceDataPersonManagement />,
        },
        {
          path: "sface-data/people/create",
          element: <SFaceDataPersonForm />,
        },
        {
          element: <SFaceDataPersonForm />,
          path: "sface-data/people/edit/:id",
        },

        {
          path: "sface-data/tasks",
          element: <SFaceDataTaskManagement />,
        },

        {
          path: "sface-data/faces",
          element: <SFaceDataFaceManagement />,
        },
        {
          path: "sface-data/faces/create",
          element: <SFaceDataFaceForm />,
        },
        {
          path: "sface-data/faces/edit/:id",
          element: <SFaceDataFaceForm />,
        },

        {
          path: "web-master/settings",
          element: <WebMasterSettingManagement />,
        },
        {
          path: "web-master/settings/edit/:id",
          element: <WebMasterSettingForm />,
        },

        {
          path: "web-master/backup",
          element: <WebMasterBackupManagement />,
        },

        {
          path: "web-master/server-status",
          element: <WebMasterServerStatusManagement />,
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
