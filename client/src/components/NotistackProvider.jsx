// material
import { createStyles, makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import { SnackbarProvider } from "notistack";
import PropTypes from "prop-types";

import { MIconButton } from "./@material-extend";
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const SnackbarCloseButton = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <MIconButton onClick={() => closeSnackbar(snackbarKey)}>
      <Iconify icon="eva:close-outline" sx={{ color: "#fff" }} />
    </MIconButton>
  );
};

const NotistackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

NotistackProvider.propTypes = {
  children: PropTypes.node,
};

export default NotistackProvider;
