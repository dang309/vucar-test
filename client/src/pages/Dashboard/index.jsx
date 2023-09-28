import { Box, Container, Grid, Stack } from "@mui/material";
import { teal } from "@mui/material/colors";

import ConfirmationDialog from "src/components/dialogs/ConfirmationDialog";
import Page from "src/components/Page";
import { useData, useLocales } from "src/hooks";
import { GET_TYPE } from "src/utils/constant";

import StatisticBox from "./components/StatisticBox";

const Dashboard = () => {
  const { t } = useLocales();

  const { data: personCount } = useData("/people/count", GET_TYPE.COUNT);
  const { data: faceCount } = useData("/faces/count", GET_TYPE.COUNT);
  const { data: modelCount } = useData("/models/count", GET_TYPE.COUNT);
  const { data: taskCount } = useData("/tasks/count", GET_TYPE.COUNT);
  const { data: assetCount } = useData("/assets/count", GET_TYPE.COUNT);

  const boxes = [
    {
      name: t("DASHBOARD.ASSET"),
      total: assetCount || 0,
      icon: "eva:image-outline",
    },
    {
      name: t("DASHBOARD.PERSON"),
      total: personCount || 0,
      icon: "eva:people-outline",
      color: teal[900],
      bgColor: teal[100],
    },
    {
      name: t("DASHBOARD.FACE"),
      total: faceCount || 0,
      icon: "eva:smiling-face-outline",
    },
    {
      name: t("DASHBOARD.MODEL"),
      total: modelCount || 0,
      icon: "eva:cube-outline",
    },
    {
      name: t("DASHBOARD.TASK"),
      total: taskCount || 0,
      icon: "eva:checkmark-square-outline",
    },
  ];

  return (
    <Page title="Dashboard">
      <Container maxWidth={false}>
        <Stack direction="column" spacing={2}>
          <Box>
            <Grid container spacing={1} columns={10}>
              {boxes.map((box, index) => {
                return (
                  <Grid item lg={2} sm={5} xs={10} key={index}>
                    <StatisticBox {...box} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      </Container>

      <ConfirmationDialog />
    </Page>
  );
};

export default Dashboard;
