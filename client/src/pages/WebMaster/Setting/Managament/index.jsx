import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import { Box, Tooltip } from "@mui/material";
import { blue, grey, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";

import { useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { TableAction } from "src/pages/@base/components";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const Management = () => {
  const { t } = useLocales();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("code", {
      header: t("TABLE.COLUMN.CODE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("value", {
      header: t("TABLE.COLUMN.VALUE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("title", {
      header: t("TABLE.COLUMN.TITLE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("desc", {
      header: t("TABLE.COLUMN.DESC"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("type", {
      header: t("TABLE.COLUMN.TYPE"),
      cell: (info) => {
        const type = info.getValue();
        return (
          <Box>
            {type === "public" && (
              <Tooltip title={t("TOOLTIP.PUBLIC")} arrow>
                <PublicRoundedIcon sx={{ color: blue[500] }} />
              </Tooltip>
            )}
            {type === "private" && (
              <Tooltip title={t("TOOLTIP.PRIVATE")} arrow>
                <SecurityRoundedIcon sx={{ color: grey[500] }} />
              </Tooltip>
            )}
          </Box>
        );
      },
    }),

    columnHelper.accessor("dataType", {
      header: t("TABLE.COLUMN.DATA_TYPE"),
      cell: (info) => info.getValue(),
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
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.SETTING"),
      href: PATH_DASHBOARD.webMaster.setting.management,
    },
  ];

  const filters = [
    {
      name: "title",
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
      apiData="/settings"
      pageTitle={t("HEADING.SETTING_MANAGEMENT")}
      heading={t("HEADING.SETTING_MANAGEMENT")}
      breadcrumbs={breadcrumbs}
      showSearch={true}
      columns={columns}
      filters={filters}
      shouldShowCheckbox={false}
      canAddNewRecord={false}
    />
  );
};

export default Management;
