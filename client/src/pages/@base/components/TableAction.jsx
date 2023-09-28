import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";

// routes
import { MHidden } from "src/components/@material-extend";
import Iconify from "src/components/Iconify";

// ----------------------------------------------------------------------

const TableMoreMenu = ({ id, actions }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MHidden width="lgUp">
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <Iconify icon="eva:more-vertical-outline" />
        </IconButton>

        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          disableScrollLock
          PaperProps={{
            sx: { width: 200, maxWidth: "100%" },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {actions &&
            actions.map((action, index) => {
              if (action.type === "link")
                return (
                  <MenuItem
                    component={RouterLink}
                    to={action.href + id}
                    key={index}
                  >
                    <ListItemIcon
                      sx={{
                        color: action.disabled ? "inherit" : action.color,
                      }}
                    >
                      <Iconify icon={action.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={action.name}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: action.disabled ? "inherit" : action.color,
                      }}
                    />
                  </MenuItem>
                );
              return (
                <MenuItem
                  key={index}
                  onClick={action.handler}
                  disabled={action.disabled}
                >
                  <ListItemIcon
                    sx={{
                      color: action.disabled ? "inherit" : action.color,
                    }}
                  >
                    <Iconify icon={action.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={action.name}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: action.disabled ? "inherit" : action.color,
                    }}
                  />
                </MenuItem>
              );
            })}
        </Menu>
      </MHidden>

      <MHidden width="lgDown">
        <Stack direction="row" alignItems="center">
          {actions &&
            actions.map((action, index) => {
              if (action.type === "link")
                return (
                  <Tooltip key={index} title={action.name} arrow>
                    <IconButton
                      component={RouterLink}
                      to={action.href + id}
                      sx={{ color: action.color }}
                      disabled={action.disabled}
                    >
                      <Iconify icon={action.icon} />
                    </IconButton>
                  </Tooltip>
                );
              return (
                <Tooltip key={index} title={action.name} arrow>
                  <IconButton
                    sx={{ color: action.color }}
                    onClick={action.handler}
                    disabled={action.disabled}
                  >
                    <Iconify icon={action.icon} />
                  </IconButton>
                </Tooltip>
              );
            })}
        </Stack>
      </MHidden>
    </>
  );
};

TableMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  userName: PropTypes.string,
};

export default TableMoreMenu;
