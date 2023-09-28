// routes
// ----------------------------------------------------------------------
import { PATH_DASHBOARD } from "src/routes/paths";

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "SIDEBAR.GROUP.GENERAL",
    items: [
      {
        title: "SIDEBAR.NAV.DASHBOARD",
        path: PATH_DASHBOARD.dashboard,
        icon: "eva:pie-chart-outline",
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "SIDEBAR.GROUP.MANAGEMENT",
    items: [
      {
        title: "SIDEBAR.NAV.USER",
        path: PATH_DASHBOARD.user.management,
        icon: "eva:people-outline",
      },

      {
        title: "SIDEBAR.NAV.SYSTEM",
        path: PATH_DASHBOARD.system.management,
        icon: "eva:flash-outline",
      },

      {
        title: "SIDEBAR.NAV.ASSET",
        path: PATH_DASHBOARD.asset.management,
        icon: "eva:image-outline",
      },

      {
        title: "SIDEBAR.NAV.SFACE_DATA",
        path: PATH_DASHBOARD.sfaceData.index,
        icon: "eva:bulb-outline",
        children: [
          {
            title: "SIDEBAR.NAV.PERSON",
            path: PATH_DASHBOARD.sfaceData.person.management,
          },
          {
            title: "SIDEBAR.NAV.FACE",
            path: PATH_DASHBOARD.sfaceData.face.management,
          },
          {
            title: "SIDEBAR.NAV.MODEL",
            path: PATH_DASHBOARD.sfaceData.model.management,
          },
          {
            title: "SIDEBAR.NAV.TASK",
            path: PATH_DASHBOARD.sfaceData.task.management,
          },
        ],
      },

      {
        title: "SIDEBAR.NAV.WEB_MASTER",
        path: PATH_DASHBOARD.webMaster.index,
        icon: "eva:settings-2-outline",
        children: [
          {
            title: "SIDEBAR.NAV.SETTING",
            path: PATH_DASHBOARD.webMaster.setting.management,
          },
          {
            title: "SIDEBAR.NAV.BACKUP",
            path: PATH_DASHBOARD.webMaster.backup.management,
          },
          {
            title: "SIDEBAR.NAV.SERVER_STATUS",
            path: PATH_DASHBOARD.webMaster.serverStatus.management,
          },
        ],
      },
    ],
  },
];

export default sidebarConfig;
