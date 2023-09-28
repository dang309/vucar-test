import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const CPUBox = ({ serverInfo }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="CPU" />
      <CardContent>
        <Stack spacing={1}>
          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Manufacturer:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {serverInfo?.cpu.manufacturer}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Brand:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.cpu.brand}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Cores:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {serverInfo?.cpu.physicalCores}x
                {serverInfo?.cpu.performanceCores}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Cache:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <List dense disablePadding>
                <ListItem sx={{ p: 0 }}>
                  <ListItemText primary="L1d" />
                  <ListItemIcon>
                    {serverInfo?.cpu?.cache?.l1d / 1024 + " KB"}
                  </ListItemIcon>
                </ListItem>

                <ListItem sx={{ p: 0 }}>
                  <ListItemText primary="L1i" />
                  <ListItemIcon>
                    {serverInfo?.cpu?.cache?.l1i / 1024 + " KB"}
                  </ListItemIcon>
                </ListItem>

                <ListItem sx={{ p: 0 }}>
                  <ListItemText primary="L2" />
                  <ListItemIcon>
                    {serverInfo?.cpu?.cache?.l2 / 1024 + " KB"}{" "}
                  </ListItemIcon>
                </ListItem>

                <ListItem sx={{ p: 0 }}>
                  <ListItemText primary="L3" />
                  <ListItemIcon>
                    {serverInfo?.cpu?.cache?.l3 / 1024 + " KB"}
                  </ListItemIcon>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CPUBox;
