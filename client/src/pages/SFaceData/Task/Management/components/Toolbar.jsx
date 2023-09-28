import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import Label from "src/components/Label";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Toolbar = ({ data, tab, handleChangeTab }) => {
  const all = data && data.length;
  const idle = data && data.filter((opt) => opt.status === "idle").length;
  const progress =
    data && data.filter((opt) => opt.status === "progress").length;
  const done = data && data.filter((opt) => opt.status === "done").length;
  const error = data && data.filter((opt) => opt.status === "error").length;

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Box>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>All</Typography>
                <Label color="primary" opacity={tab === 0 ? 0.64 : 0.16}>
                  {all}
                </Label>
              </Stack>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Idle</Typography>
                <Label color="default" opacity={tab === 1 ? 0.64 : 0.16}>
                  {idle}
                </Label>
              </Stack>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Progress</Typography>
                <Label color="warning" opacity={tab === 2 ? 0.64 : 0.16}>
                  {progress}
                </Label>
              </Stack>
            }
            {...a11yProps(2)}
          />
          <Tab
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Done</Typography>
                <Label color="success" opacity={tab === 3 ? 0.64 : 0.16}>
                  {done}
                </Label>
              </Stack>
            }
            {...a11yProps(3)}
          />
          <Tab
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Error</Typography>
                <Label color="error" opacity={tab === 4 ? 0.64 : 0.16}>
                  {error}
                </Label>
              </Stack>
            }
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Toolbar;
