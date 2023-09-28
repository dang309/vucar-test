import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const MemBox = ({ serverInfo }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Memory" />
      <CardContent>
        <Stack spacing={1}>
          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Total:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.total / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Free:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.free / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Used:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.used / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Available:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.available / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Swap Total:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.swaptotal / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Swap Used:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.swapused / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Swap Free:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {(serverInfo?.mem.swapfree / 1024 ** 3).toFixed(2)} GB
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MemBox;
