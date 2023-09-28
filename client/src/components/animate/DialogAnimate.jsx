// material
import { Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

//
import { varFadeInUp } from "./variants";

// ----------------------------------------------------------------------

const DialogAnimate = ({
  open = false,
  animate,
  onClose,
  children,
  ...other
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={motion.div}
          PaperProps={{
            sx: {
              borderRadius: 2,
              bgcolor: "background.paper",
            },
            ...(animate || varFadeInUp),
          }}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
};

DialogAnimate.propTypes = {
  open: PropTypes.bool.isRequired,
  animate: PropTypes.object,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DialogAnimate;
