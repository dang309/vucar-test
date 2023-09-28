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

const HardwareBox = ({ serverInfo }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Hardware" />
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
                {serverInfo?.hardware.manufacturer}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Model:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {serverInfo?.hardware.model}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HardwareBox;
