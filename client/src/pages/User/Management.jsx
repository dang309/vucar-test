import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { useSWRConfig } from "swr";

import { UserAPI } from "src/api";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useAuth, useEventBus, useLocales } from "src/hooks";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

import { TableAction } from "../@base/components";

const apiData = "/users";

const Management = () => {
  const { user } = useAuth();

  const { t } = useLocales();

  const { mutate } = useSWRConfig();

  const { $emit } = useEventBus();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("username", {
      header: t("TABLE.COLUMN.USERNAME"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("type", {
      header: t("TABLE.COLUMN.TYPE"),
      cell: (info) => {
        const type = info.getValue() || 0;
        if (type === 1) return "ANONYMOUS";
        if (type === 2) return "NORMAL";
        if (type === 3) return "ADMIN";
        if (type === 4) return "SUPER ADMIN";
        return "";
      },
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ACTIONS"),
      cell: (info) => {
        const { id } = info.row.original;
        const actions = [
          {
            name: t("BUTTON.EDIT"),
            icon: "eva:edit-outline",
            type: "link",
            href: `${window.location.href}/edit/`,
            color: yellow[700],
            disabled: user?.id === id,
          },
          {
            name: t("BUTTON.DELETE"),
            icon: "eva:trash-2-outline",
            type: "action",
            handler: () => handleDeleteOne(id),
            color: red[500],
            disabled: user?.id === id,
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const handleDeleteOne = (id) => {
    $emit("dialog/confirmation/open", {
      title: t("DIALOG.TITLE.DELETE"),
      content: t("DIALOG.CONTENT.DELETE"),
      actionText: "Delete",
      actionHandler: async (cb) => {
        return UserAPI.delete(id)
          .then(() => {
            mutate((key) => typeof key === "string" && key.startsWith(apiData));
          })
          .then(() => {
            $emit("dialog/confirmation/close");
          })
          .finally(() => {
            if (cb) cb();
          });
      },
    });
  };

  const headingBtns = [
    {
      name: t("BUTTON.ADD"),
      icon: "eva:plus-outline",
      type: "link",
      href: window.location.href + "/create",
      color: "primary",
    },
  ];

  const breadcrumbs = [
    {
      name: "Cars",
      href: PATH_DASHBOARD.car.management,
    },
  ];

  const filters = [
    {
      name: "username",
      type: INPUT_TYPE.SEARCH,
      required: false,
      disabled: false,
      readOnly: false,
      default: "",
      placeholder: t("PLACEHOLDER.SEARCH"),
    },
  ];

  return (
    <Page title="Car Management">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Car Management"
          links={
            breadcrumbs || [
              {
                name: "Cars",
                href: PATH_DASHBOARD.car.management,
              },
            ]
          }
          action={
            <Stack direction="row" alignItems="center" spacing={1}>
              {headingBtns &&
                headingBtns.map((btn, index) => {
                  if (btn.type === "action")
                    return (
                      <LoadingButton
                        key={index}
                        loading={btn.isLoading}
                        variant="contained"
                        startIcon={<Iconify icon={btn.icon} />}
                        color={btn.color}
                        onClick={btn.handler}
                      >
                        {btn.name}
                      </LoadingButton>
                    );
                  return (
                    <Button
                      key={index}
                      variant="contained"
                      component={RouterLink}
                      to={btn.href}
                      startIcon={<Iconify icon={btn.icon} />}
                      color={btn.color}
                    >
                      {btn.name}
                    </Button>
                  );
                })}
            </Stack>
          }
        />

        <Grid container>
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Management;
