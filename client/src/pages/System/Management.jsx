import { green, red, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { useSWRConfig } from "swr";

import { SystemAPI } from "src/api";
import Iconify from "src/components/Iconify";
import { useEventBus, useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { PATH_DASHBOARD } from "src/routes/paths";

import { TableAction } from "../@base/components";
import { INPUT_TYPE } from "src/utils/constant";

const apiData = "/system";

const Management = () => {
  const { $emit } = useEventBus();

  const { mutate } = useSWRConfig();

  const { t } = useLocales();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: t("TABLE.COLUMN.NAME"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("desc", {
      header: t("TABLE.COLUMN.DESC"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("isDefault", {
      header: t("TABLE.COLUMN.DEFAULT"),
      cell: (info) => {
        const isDefault = info.getValue();
        if (isDefault)
          return (
            <Iconify icon="eva:checkmark-circle-2-outline" color={green[500]} />
          );
        return <Iconify icon="eva:close-circle-outline" color={red[500]} />;
      },
    }),

    columnHelper.accessor("securityKey", {
      header: t("TABLE.COLUMN.SECURITY_KEY"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ACTIONS"),
      cell: (info) => {
        const { id, isDefault } = info.row.original;
        const actions = [
          {
            name: t("BUTTON.EDIT"),
            icon: "eva:edit-outline",
            type: "link",
            disabled: isDefault,
            href: `${window.location.href}/edit/`,
            color: yellow[700],
          },
          {
            name: t("BUTTON.DELETE"),
            icon: "eva:trash-2-outline",
            type: "action",
            handler: () => handleDeleteOne(id),
            color: red[500],
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
        return SystemAPI.delete(id)
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
      name: t("BREADCRUMB.SYSTEM"),
      href: PATH_DASHBOARD.system.management,
    },
  ];

  const filters = [
    {
      name: "name",
      type: INPUT_TYPE.SEARCH,
      required: false,
      disabled: false,
      readOnly: false,
      default: "",
      placeholder: t("PLACEHOLDER.SEARCH"),
    },
  ];

  return (
    <BaseManagementPage
      apiData={apiData}
      pageTitle={t("HEADING.SYSTEM_MANAGEMENT")}
      heading={t("HEADING.SYSTEM_MANAGEMENT")}
      breadcrumbs={breadcrumbs}
      showSearch={true}
      columns={columns}
      filters={filters}
      headingBtns={headingBtns}
      handleDeleteOne={handleDeleteOne}
    />
  );
};

export default Management;
