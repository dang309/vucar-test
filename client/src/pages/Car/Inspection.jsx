import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import qs from "qs";

import { CarAPI, CriteriaAPI, ResultAPI } from "src/api";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Label from "src/components/Label";
import Page from "src/components/Page";
import { useAuth, useData, useLocales } from "src/hooks";
import { PATH_DASHBOARD } from "src/routes/paths";
import LoadingScreen from "src/components/LoadingScreen";

const Item = ({ carId, criterion, genCriteria, inspectionResult }) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (e) => {
    const dataToSave = {
      carId: parseInt(carId),
      userId: user?.id,
      criterionId: criterion.id,
      isGood: e.target.checked,
      note,
    };
    ResultAPI.create(dataToSave).then(() => {});
    setChecked(e.target.checked);
  };

  const handleSaveNote = () => {
    const dataToSave = {
      carId: parseInt(carId),
      userId: user?.id,
      criterionId: criterion.id,
      isGood: checked,
      note,
    };
    ResultAPI.create(dataToSave);
  };

  useEffect(() => {
    inspectionResult.forEach((item) => {
      if (item.criterionId === criterion.id) {
        setNote(item.note);
        setChecked(item.isGood);
        if (item.note) {
          setOpen(true);
        }
      }
    });
  }, [inspectionResult]);

  return (
    <Fragment>
      <ListItem disablePadding sx={{ py: 1 }}>
        {!criterion.children && (
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked}
              onChange={handleCheck}
              tabIndex={-1}
            />
          </ListItemIcon>
        )}
        <ListItemText
          primary={
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant={`${
                  !criterion.children ? "body1" : `h${criterion.level + 3}`
                }`}
                sx={{}}
              >
                {criterion.name}
              </Typography>
              {!criterion.children &&
                inspectionResult.some(
                  (item) => item.criterionId === criterion.id && item.note
                ) && <Label color="success">Noted</Label>}
            </Stack>
          }
        />

        {!criterion.children && (
          <Box onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Box>
        )}
      </ListItem>
      <Box>
        {criterion.children &&
          criterion.children.length > 0 &&
          genCriteria(criterion.children)}
      </Box>
      {!criterion.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <TextField
            fullWidth
            label="Note"
            placeholder="Write a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleSaveNote}
          />
        </Collapse>
      )}
    </Fragment>
  );
};

const Inspection = () => {
  const { id } = useParams();

  const { t } = useLocales();

  const [car, setCar] = useState();
  const [criteria, setCriteria] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const params = {
    filters: JSON.stringify([
      {
        key: "carId",
        operator: "=",
        value: id,
      },
    ]),
  };

  const { items: inspectionResult } = useData(
    `/inspection-result?${qs.stringify(params)}`
  );

  const loadData = () => {
    if (id) {
      setIsLoading(true);
      Promise.all([
        (CarAPI.getOne(id).then((res) => {
          if (res.status === 200) {
            const user = res.data.data;
            setCar(user);
          }
        }),
        CriteriaAPI.getAll({ pageSize: 999 }).then((res) => {
          if (res.status === 200) {
            const criteria = res.data.data?.items;
            setCriteria(criteria);
          }
        })),
      ])
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  };

  const breadcrumbs = [
    {
      name: "Xe",
      href: PATH_DASHBOARD.car.management,
    },
    {
      name: "Kiểm tra",
      href: PATH_DASHBOARD.car.management,
    },
  ];

  const genCriteria = (criteria) => {
    if (!criteria) return null;
    if (criteria && criteria.length <= 0) return null;

    return (
      <List sx={{ width: "100%", maxWidth: 512, bgcolor: "background.paper" }}>
        {criteria.map((criterion) => {
          return (
            <Item
              key={criterion.id}
              carId={id}
              criterion={criterion}
              genCriteria={genCriteria}
              inspectionResult={inspectionResult}
            />
          );
        })}
      </List>
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page title="Kiểm tra xe">
      <Container
        maxWidth={false}
        component="form"
        autoComplete="off"
        sx={{ position: "sticky", top: 0 }}
      >
        <HeaderBreadcrumbs
          heading="Kiểm tra xe"
          links={breadcrumbs || [{ name: "", href: "" }]}
        />

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Grid container spacing={2}>
            {car && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card sx={{ width: "100%" }}>
                  <CardMedia
                    component="img"
                    height="256"
                    alt={car.carName}
                    image={car.thumbnail}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {car.carName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.model}{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader title="DANH SÁCH KIỂM TRA 223 ĐIỂM" />
                <CardContent>{genCriteria(criteria)}</CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default Inspection;
