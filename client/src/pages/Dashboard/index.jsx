import { Box, Container, Grid, Stack } from "@mui/material";
import { teal } from "@mui/material/colors";

import ConfirmationDialog from "src/components/dialogs/ConfirmationDialog";
import Page from "src/components/Page";
import { useData, useLocales } from "src/hooks";
import { GET_TYPE } from "src/utils/constant";

import StatisticBox from "./components/StatisticBox";

const Dashboard = () => {
  const { t } = useLocales();

  return (
    <Page title="Dashboard">
      <Container maxWidth={false}>
        <Stack direction="column" spacing={2}>
          <Box>
            <Grid container spacing={1} columns={10}></Grid>
          </Box>
        </Stack>
      </Container>

      <ConfirmationDialog />
    </Page>
  );
};

export default Dashboard;
