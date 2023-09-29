// routes
// ----------------------------------------------------------------------
import { PATH_DASHBOARD } from "src/routes/paths";

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: "SIDEBAR.GROUP.GENERAL",
  //   items: [
  //     {
  //       title: "SIDEBAR.NAV.DASHBOARD",
  //       path: PATH_DASHBOARD.dashboard,
  //       icon: "eva:pie-chart-outline",
  //     },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "Quản lý",
    items: [
      {
        title: "Xe",
        path: PATH_DASHBOARD.car.management,
        icon: "lucide:car",
      },
    ],
  },
];

export default sidebarConfig;
