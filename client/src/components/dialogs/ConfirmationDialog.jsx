// material
import { useState } from "react";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useEventBus } from "src/hooks";

import { DialogAnimate } from "../animate";

const ConfirmationDialog = () => {
  const { $on } = useEventBus();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    content: "",
    cancelText: "",
    actionText: "",
    actionHandler: null,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOkAction = () => {
    setIsLoading(true);
    info.actionHandler(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    $on("dialog/confirmation/open", (payload) => {
      handleOpen();
      setInfo(payload);
    });

    $on("dialog/confirmation/close", () => {
      handleClose();
    });
  }, [$on]);

  return (
    <DialogAnimate maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{info.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{info.content} </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {info.cancelText || "Cancel"}
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={handleOkAction}
          variant="contained"
        >
          {info.actionText || "Ok"}
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
};

export default ConfirmationDialog;
