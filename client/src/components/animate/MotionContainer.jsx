// material
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

//
import { varWrapEnter } from "./variants";

// ----------------------------------------------------------------------

const MotionContainer = ({ open, children, ...other }) => {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? "animate" : "exit"}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
};

MotionContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default MotionContainer;
