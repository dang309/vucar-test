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

const BiosBox = ({ serverInfo }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Bios" />
      <CardContent>
        <Stack spacing={1}>
          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Vendor:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">{serverInfo?.bios.vendor}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item lg={6} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Version:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Typography variant="body2">
                {serverInfo?.bios.version}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BiosBox;
