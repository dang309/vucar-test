import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled, useTheme } from "@mui/material/styles";
import { SWRConfig } from "swr";

import ChangePasswordDialog from "src/components/dialogs/ChangePasswordDialog";
import ConfirmationDialog from "src/components/dialogs/ConfirmationDialog";
import ProfileDialog from "src/components/dialogs/ProfileDialog";
// hooks
import useCollapseDrawer from "src/hooks/useCollapseDrawer";

//
import Header from "./Header";
import Sidebar from "./Sidebar";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const ManagementLayout = () => {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();

  const [open, setOpen] = useState(false);

  return (
    <SWRConfig>
      <RootStyle>
        <Header onOpenSidebar={() => setOpen(true)} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle
          sx={{
            transition: theme.transitions.create("margin", {
              duration: theme.transitions.duration.complex,
            }),
            ...(collapseClick && {
              ml: "102px",
            }),
          }}
        >
          <Outlet />
        </MainStyle>
        <ChangePasswordDialog />
        <ProfileDialog />
        <ConfirmationDialog />
      </RootStyle>
    </SWRConfig>
  );
};

export default ManagementLayout;
