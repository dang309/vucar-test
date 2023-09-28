import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { indexOf } from "lodash";

const GraphicBox = ({ serverInfo }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Graphics" />
      <CardContent>
        <Stack divider={<Divider />} spacing={1}>
          {serverInfo &&
            serverInfo.graphic &&
            serverInfo.graphic.controllers &&
            serverInfo.graphic.controllers.map((controller, index) => {
              return (
                <Stack key={index} spacing={1}>
                  <Grid container>
                    <Grid item lg={6} sm={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Vendor:
                      </Typography>
                    </Grid>
                    <Grid item lg={6} sm={6}>
                      <Typography variant="body2">
                        {controller?.vendor}
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
                        {controller?.model}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              );
            })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default GraphicBox;
