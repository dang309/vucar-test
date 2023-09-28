import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Loader from "src/components/Loader";

const CustomizedTooltip = ({ active, payload }) => {
  if (!payload) return null;
  if (active) {
    return (
      <Card sx={{ width: 200 }}>
        <CardHeader title={payload[0].payload.timestamp} />
        <CardContent>
          <Stack spacing={2}>
            <Grid container>
              <Grid item lg={6} sm={6}>
                <Typography sx={{ fontWeight: "bold", color: "#8884d8" }}>
                  CPU:
                </Typography>
              </Grid>
              <Grid item lg={6} sm={6}>
                {payload[0].payload.cpuUsage}%
              </Grid>
            </Grid>

            <Grid container>
              <Grid item lg={6} sm={6}>
                <Typography sx={{ fontWeight: "bold", color: "#82ca9d" }}>
                  RAM:
                </Typography>
              </Grid>
              <Grid item lg={6} sm={6}>
                {payload[0].payload.memUsage}%
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const Monitoring = ({ data }) => {
  return (
    <Card>
      <CardHeader title="CPU & RAM usage" subheader="Update every 10 seconds" />
      <CardContent>
        {data.length === 0 && <Loader />}
        {data.length > 0 && (
          <ResponsiveContainer height={512} width="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomizedTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="cpuUsage"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="memUsage"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default Monitoring;
