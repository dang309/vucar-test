import { useState } from "react";
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
} from "react-router-dom";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
// material
import { alpha, styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

import Iconify from "./Iconify";
import { useLocales } from "src/hooks";

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

const NavItem = ({ item, active, isShow }) => {
  const theme = useTheme();
  const { t } = useLocales();

  console.log(item.path);

  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          {icon && (
            <ListItemIconStyle>
              <Iconify icon={icon} />
            </ListItemIconStyle>
          )}

          {isShow && (
            <>
              <ListItemText disableTypography primary={t(title)} />
              {info && info}
              <Box
                component={Iconify}
                icon={
                  open
                    ? "eva:arrow-ios-downward-outline"
                    : "eva:arrow-ios-forward-outline"
                }
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path } = item;
                const isActiveSub = active(path);

                return (
                  <ListItemStyle
                    key={t(title)}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={t(title)} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      {icon && (
        <ListItemIconStyle>
          <Iconify icon={icon} />
        </ListItemIconStyle>
      )}

      {isShow && (
        <>
          <ListItemText disableTypography primary={t(title)} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
};

NavItem.propTypes = {
  active: PropTypes.func,
  isShow: PropTypes.bool,
  item: PropTypes.object,
};

const NavSection = ({ navConfig, isShow = true, ...other }) => {
  const { pathname } = useLocation();
  const { t } = useLocales();

  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            {isShow && <ListSubheaderStyle>{t(subheader)}</ListSubheaderStyle>}
            {items.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                active={match}
                isShow={isShow}
              />
            ))}
          </List>
        );
      })}
    </Box>
  );
};

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default NavSection;
