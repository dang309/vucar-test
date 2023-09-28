import { red, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { useSWRConfig } from "swr";

import { UserAPI } from "src/api";
import { useAuth, useData, useEventBus, useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { PATH_DASHBOARD } from "src/routes/paths";

import { TableAction } from "../@base/components";
import { INPUT_TYPE } from "src/utils/constant";

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
      name: t("BREADCRUMB.USER"),
      href: PATH_DASHBOARD.user.management,
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
    <BaseManagementPage
      apiData={apiData}
      pageTitle={t("HEADING.USER_MANAGEMENT")}
      heading={t("HEADING.USER_MANAGEMENT")}
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
