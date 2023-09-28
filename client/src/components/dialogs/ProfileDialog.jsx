// material
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { useAuth, useEventBus, useLocales } from "src/hooks";

import { DialogAnimate } from "../animate";

const ProfileDialog = () => {
  const { $on, $remove } = useEventBus();

  const { t } = useLocales();

  const { user, updateProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: user?.username || "",
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateProfile = handleSubmit(async (data) => {
    if (!user.id) return;
    const { username } = data;
    return updateProfile(user.id, { username }).then(() => {
      handleClose();
    });
  });

  useEffect(() => {
    $on("dialog/profile/open", () => {
      handleOpen();
    });

    $on("dialog/profile/close", () => {
      handleClose();
    });

    return () => {
      $remove("dialog/profile/open");
      $remove("dialog/profile/close");
    };
  }, [$on, $remove]);

  return (
    <DialogAnimate open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("DIALOG.TITLE.PROFILE")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => {
              return <TextField {...field} label={t("LABEL.USERNAME")} required />;
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('BUTTON.CANCEL')}
        </Button>
        <LoadingButton
          loading={isSubmitting}
          onClick={handleUpdateProfile}
          variant="contained"
        >
          {t('BUTTON.SAVE')}
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
};

export default ProfileDialog;
