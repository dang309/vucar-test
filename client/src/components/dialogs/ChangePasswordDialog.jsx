// material
import { useEffect,useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { AuthAPI } from "src/api";
import { useEventBus, useLocales } from "src/hooks";

import { DialogAnimate } from "../animate";

const ChangePasswordDialog = () => {
  const { $on, $remove } = useEventBus();

  const { t } = useLocales();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = handleSubmit(async (data) => {
    const { oldPassword, newPassword, rePassword } = data;
    if (newPassword !== rePassword)
      return enqueueSnackbar(t('NOTI.MISMATCH_PASSWORD'), {
        variant: "error",
      });
    return AuthAPI.changePassword(oldPassword, newPassword)
      .then(() => {
        handleClose();
      })
      .catch((err) => err);
  });

  useEffect(() => {
    $on("dialog/change-password/open", () => {
      handleOpen();
    });

    $on("dialog/change-password/close", () => {
      handleClose();
    });

    return () => {
      $remove("dialog/change-password/open");
      $remove("dialog/change-password/close");
    };
  }, [$on, $remove]);

  return (
    <DialogAnimate open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("DIALOG.TITLE.CHANGE_PASSWORD")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label={t("LABEL.OLD_PASSWORD")}
                  required
                />
              );
            }}
          />

          <Divider />

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label={t("LABEL.NEW_PASSWORD")}
                  required
                />
              );
            }}
          />

          <Controller
            name="rePassword"
            control={control}
            render={({ field }) => {
              return (
                <TextField {...field} label={t("LABEL.RE_PASSWORD")} required />
              );
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t("BUTTON.CANCEL")}
        </Button>
        <LoadingButton
          loading={isSubmitting}
          onClick={handleChangePassword}
          variant="contained"
        >
          {t("BUTTON.CHANGE")}
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
};

export default ChangePasswordDialog;
