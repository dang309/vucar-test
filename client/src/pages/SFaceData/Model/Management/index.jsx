import { cyan, green, pink, red, teal, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { constantCase } from "change-case";

import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import ProgressWithLabel from "src/components/ProgressWithLabel";
import { useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { TableAction } from "src/pages/@base/components";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const apiData = "/models";

const Management = () => {
  const columnHelper = createColumnHelper();

  const { t } = useLocales();

  const columns = [
    columnHelper.accessor("title", {
      header: t("TABLE.COLUMN.TITLE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("alias", {
      header: t("TABLE.COLUMN.ALIAS"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("type", {
      header: t("TABLE.COLUMN.TYPE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("isActivated", {
      header: t("TABLE.COLUMN.ACTIVATED"),
      cell: (info) => {
        const isActivated = info.getValue();
        if (isActivated)
          return (
            <Iconify icon="eva:checkmark-circle-2-outline" color={green[500]} />
          );
        return <Iconify icon="eva:close-circle-outline" color={red[500]} />;
      },
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

    columnHelper.accessor("progress", {
      header: t("TABLE.COLUMN.PROGRESS"),
      cell: (info) => {
        const progress = info.getValue();
        if (!progress && progress !== 0) return null;
        return <ProgressWithLabel progress={progress} />;
      },
    }),

    columnHelper.accessor("status", {
      header: t("TABLE.COLUMN.STATUS"),
      cell: (info) => {
        const status = info.getValue();
        let color = "default";
        if (status === "error") color = "error";
        if (status === "progress") color = "warning";
        if (status === "done") color = "success";
        return (
          <Label color={color}>{t(`STATUS.${constantCase(status)}`)}</Label>
        );
      },
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
            name: t("BUTTON.DOWNLOAD"),
            icon: "eva:download-outline",
            type: "action",
            handler: () => handleDownload(id),
            color: teal[700],
          },
          {
            name: t("BUTTON.UPLOAD"),
            icon: "eva:upload-outline",
            type: "action",
            handler: () => handleUpload(id),
            color: cyan[500],
          },
          {
            name: t("BUTTON.RETRAIN"),
            icon: "eva:repeat-outline",
            type: "action",
            handler: () => handleRetrain(id),
            color: pink[500],
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const handleDownload = (id) => {};

  const handleUpload = (id) => {};

  const handleRetrain = (id) => {};

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.MODEL"),
      href: PATH_DASHBOARD.sfaceData.model.management,
    },
  ];

  const filters = [
    {
      name: "title",
      type: INPUT_TYPE.SEARCH,
      required: false,
      disabled: false,
      readOnly: false,
      placeholder: t("PLACEHOLDER.SEARCH"),
    },

    {
      name: "type",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: "All",
          value: "all",
        },
        {
          name: "FACE_DETECTOR",
          value: "FACE_DETECTOR",
        },
        {
          name: "FACE_DESCRIPTOR",
          value: "FACE_DESCRIPTOR",
        },
      ],
      required: false,
      disabled: false,
      readOnly: false,
      default: "all",
      label: t("LABEL.TYPE"),
    },

    {
      name: "status",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: "All",
          value: "all",
        },
        {
          name: t("STATUS.DONE"),
          value: "done",
        },

        {
          name: t("STATUS.ERROR"),
          value: "error",
        },
        {
          name: t("STATUS.IDLE"),
          value: "idle",
        },
        {
          name: t("STATUS.PROGRESS"),
          value: "progress",
        },
      ],
      required: false,
      disabled: false,
      readOnly: false,
      default: "all",
      label: t("LABEL.STATUS"),
    },

    {
      name: "isActivated",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: "All",
          value: "all",
        },
        {
          name: t("OPTION.TRUE"),
          value: 1,
        },
        {
          name: t("OPTION.FALSE"),
          value: 0,
        },
      ],
      required: false,
      disabled: false,
      readOnly: false,
      default: "all",
      label: t("LABEL.ACTIVATED"),
    },
  ];

  return (
    <BaseManagementPage
      apiData={apiData}
      pageTitle={t("HEADING.MODEL_MANAGEMENT")}
      heading={t("HEADING.MODEL_MANAGEMENT")}
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
