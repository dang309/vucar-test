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

const OSBox = ({ serverInfo }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Operating System" />
      <CardContent>
        <Stack spacing={1}>
          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Platform:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.os.platform}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Distro:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.os.distro}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Version:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.os.release}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Arch:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.os.arch}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Kernel:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.os.kernel}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                UEFI:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {serverInfo?.os.uefi.toString()}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OSBox;
