import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
  Pagination,
} from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import qs from "qs";
import { useSWRConfig } from "swr";

import { UserAPI } from "src/api";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useAuth, useData, useEventBus, useLocales } from "src/hooks";
import { PATH_DASHBOARD } from "src/routes/paths";
import { GET_TYPE, INPUT_TYPE } from "src/utils/constant";
import { useState } from "react";
import { useEffect } from "react";
import Label from "src/components/Label";

const apiData = "/cars";

const Item = ({ car }) => {
  const params = {
    filters: JSON.stringify([
      {
        key: "carId",
        operator: "=",
        value: car.id,
      },
      {
        key: "isGood",
        operator: "=",
        value: true,
      },
    ]),
  };
  const { items: inspectionResult } = useData(
    `/inspection-result?${qs.stringify(params)}`
  );

  const [lastCheckedMechanical, setLastCheckedMechanical] = useState();

  const getLastCheckedMechanical = async () => {
    if (inspectionResult) {
      UserAPI.getOne(
        inspectionResult[inspectionResult.length - 1].updatedBy
      ).then((res) => {
        console.log({ res });
        if (res.status === 200) {
          setLastCheckedMechanical(res.data.data);
        }
      });
    }
  };

  useEffect(() => {
    getLastCheckedMechanical();
  }, [inspectionResult]);

  return (
    <Grid item key={car.id} lg={3} md={4} sm={6} xs={12}>
      <Card sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          alt={car.carName}
          height="200"
          image={car.thumbnail}
        />
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography gutterBottom variant="h5" component="div">
              {car.model}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {car.carName}{" "}
            </Typography>
          </Stack>
          {lastCheckedMechanical?.username ? (
            <Typography variant="body2">
              Người kiểm tra: <strong>{lastCheckedMechanical?.username}</strong>{" "}
            </Typography>
          ) : (
            <Label color="error">Chưa kiểm tra</Label>
          )}
          {lastCheckedMechanical?.username && (
            <Typography variant="body2">
              Số điểm kiểm tra đạt:{" "}
              <Label
                color={inspectionResult.length === 223 ? "success" : "warning"}
              >
                {inspectionResult?.length || 0} / 223
              </Label>{" "}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
          <Button
            component={Link}
            to={`${window.location.href}/inspect/${car.id}`}
            size="small"
            variant="contained"
            startIcon={<Iconify icon="tabler:tool" />}
          >
            Kiểm tra
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Management = () => {
  const { user } = useAuth();

  const { t } = useLocales();

  const { mutate } = useSWRConfig();

  const { $emit } = useEventBus();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 4,
  });

  const { items: car, pagination } = useData(
    `/cars?pageSize=${params.pageSize}&page=${params.page}`
  );

  const breadcrumbs = [
    {
      name: "Xe",
      href: PATH_DASHBOARD.car.management,
    },
  ];

  return (
    <Page title="Quản lý xe">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Quản lý xe"
          links={
            breadcrumbs || [
              {
                name: "Xe",
                href: PATH_DASHBOARD.car.management,
              },
            ]
          }
        />

        <Stack spacing={2} alignItems="center">
          <Grid container spacing={1}>
            {car &&
              car.map((item) => {
                return <Item key={item.id} car={item} />;
              })}
          </Grid>

          <Pagination
            count={pagination?.totalPages}
            value={params.page}
            onChange={(e, newPage) => {
              setParams((prev) => ({
                ...prev,
                page: newPage,
              }));
            }}
          />
        </Stack>
      </Container>
    </Page>
  );
};

export default Management;
