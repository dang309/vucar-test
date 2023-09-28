import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Divider, MenuItem, Popover, Typography } from "@mui/material";
// @mui
import { alpha } from "@mui/material/styles";

import { MIconButton } from "src/components/@material-extend";
import Iconify from "src/components/Iconify";
import MyAvatar from "src/components/MyAvatar";
import { useAuth, useEventBus } from "src/hooks";
import { USER_TYPE } from "src/utils/constant";

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const { $emit } = useEventBus();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  const handleOpenChangePasswordDialog = () => {
    $emit("dialog/change-password/open");
    handleClose();
  };

  const handleOpenProfile = () => {
    $emit("dialog/profile/open");
    handleClose();
  };

  return (
    <>
      <MIconButton
        size="large"
        onClick={handleOpen}
        sx={{
          p: 0,
          ml: 1.5,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar sx={{ mx: "auto" }} />
      </MIconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableScrollLock
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {USER_TYPE[user?.type]}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleOpenProfile} sx={{ m: 1, p: 1 }}>
          <Box
            component={Iconify}
            icon="eva:person-outline"
            width={24}
            height={24}
            sx={{ mr: 1, width: 24, height: 24 }}
          />
          {t("BUTTON.PROFILE")}
        </MenuItem>

        <MenuItem onClick={handleOpenChangePasswordDialog} sx={{ m: 1, p: 1 }}>
          <Box
            component={Iconify}
            icon="eva:lock-outline"
            width={24}
            height={24}
            sx={{ mr: 1, width: 24, height: 24 }}
          />
          {t("BUTTON.CHANGE_PASSWORD")}
        </MenuItem>

        <MenuItem onClick={handleSignOut} sx={{ m: 1, p: 1, color: "red" }}>
          <Box
            component={Iconify}
            icon="eva:log-out-outline"
            width={24}
            height={24}
            sx={{ mr: 1, width: 24, height: 24 }}
          />
          {t("BUTTON.LOG_OUT")}
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
