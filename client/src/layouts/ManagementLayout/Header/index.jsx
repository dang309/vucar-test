import { useState } from "react";
import { useEffect } from "react";
import { AppBar, Box, Chip, IconButton, Stack, Toolbar } from "@mui/material";
// material
import { alpha, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import Iconify from "src/components/Iconify";
import { useSocketIO } from "src/hooks";

import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
// import NotificationsPopover from "./NotificationsPopover";
import ToggleTheme from "./ToggleTheme";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 256;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

const Header = ({ onOpenSidebar }) => {
  const { socket } = useSocketIO();

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* <ToggleTheme /> */}
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default Header;
