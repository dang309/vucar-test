import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { constantCase } from "change-case";
import moment from "moment";

import Label from "src/components/Label";
import ProgressWithLabel from "src/components/ProgressWithLabel";
import { useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { TableAction } from "src/pages/@base/components";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const Management = () => {
  const { t } = useLocales();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("jobCode", {
      header: t("TABLE.COLUMN.JOB_CODE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("taskCode", {
      header: t("TABLE.COLUMN.TASK_CODE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("system", {
      header: t("TABLE.COLUMN.SYSTEM"),
      cell: (info) => {
        const system = info.getValue();
        if (!system) return null;
        return (
          <Link
            component={RouterLink}
            to={`${window.location.origin}/sface/admin/system/edit/${system?.id}`}
          >
            {system?.name}
          </Link>
        );
      },
    }),

    columnHelper.accessor("updatedAt", {
      header: t("TABLE.COLUMN.LAST_UPDATE"),
      cell: (info) => moment(info.getValue()).format("YYYY-MM-DD"),
    }),

    columnHelper.accessor("createdAt", {
      header: t("TABLE.COLUMN.CREATED_DATE"),
      cell: (info) => moment(info.getValue()).format("YYYY-MM-DD"),
    }),

    columnHelper.accessor("jobType", {
      header: t("TABLE.COLUMN.JOB_TYPE"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("taskType", {
      header: t("TABLE.COLUMN.TASK_TYPE"),
      cell: (info) => info.getValue(),
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
        const { id } = info.row.original;
        const actions = [
          {
            name: t("BUTTON.RESTART"),
            icon: "eva:refresh-outline",
            type: "action",
            handler: (id) => handleRestart(id),
            color: yellow[700],
          },
          {
            name: t("BUTTON.STOP"),
            icon: "eva:stop-circle-outline",
            type: "action",
            handler: (id) => handleStop(id),
            color: red[500],
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const handleRestart = (id) => {};

  const handleStop = (id) => {};

  const filters = [
    {
      name: "startDate",
      type: INPUT_TYPE.DATE,
      required: false,
      disabled: false,
      readOnly: false,
      label: t("LABEL.START_DATE"),
      span: {
        lg: 1.5,
        md: 1.5,
        sm: 12,
      },
    },

    {
      name: "endDate",
      type: INPUT_TYPE.DATE,
      required: false,
      disabled: false,
      readOnly: false,
      label: t("LABEL.END_DATE"),
      span: {
        lg: 1.5,
        md: 1.5,
        sm: 12,
      },
    },
    {
      name: "jobType",
      type: INPUT_TYPE.SELECT,
      label: t("TABLE.COLUMN.JOB_TYPE"),
      options: [
        { name: "All", value: "all" },
        { name: "Face ingest", value: "face_ingest" },
        { name: "Face detection", value: "face_detection" },
        { name: "Face analysis", value: "face_analysis" },
        { name: "Face verification", value: "face_verification" },
        { name: "Person ingest", value: "person_ingest" },
      ],
      required: false,
      disabled: false,
      readOnly: false,
      default: "all",
      span: {
        lg: 3,
        md: 3,
        sm: 12,
      },
    },
    {
      name: "taskType",
      type: INPUT_TYPE.SELECT,
      label: t("TABLE.COLUMN.TASK_TYPE"),
      options: [
        { name: "All", value: "all" },
        { name: "Get data", value: "get_data" },
        { name: "Face detection", value: "face_detection" },
        { name: "Face extract", value: "face_extract" },
        { name: "Face analysis", value: "face_analysis" },
        { name: "Face verification", value: "face_verification" },
        { name: "Face storage", value: "face_storage" },
        { name: "Face index", value: "face_index" },
      ],
      required: false,
      disabled: false,
      readOnly: false,
      default: "all",
      span: {
        lg: 3,
        md: 3,
        sm: 12,
      },
    },

    {
      name: "status",
      type: INPUT_TYPE.SELECT,
      label: t("TABLE.COLUMN.STATUS"),
      options: [
        { name: "All", value: "all" },
        { name: t("STATUS.DONE"), value: "done" },
        { name: t("STATUS.IDLE"), value: "idle" },
        { name: t("STATUS.PROGRESS"), value: "progress" },
        { name: t("STATUS.ERROR"), value: "error" },
      ],
      required: false,
      disabled: false,
      readOnly: false,
      default: "all",
      span: {
        lg: 3,
        md: 3,
        sm: 12,
      },
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.TASK"),
      href: PATH_DASHBOARD.sfaceData.task.management,
    },
  ];

  return (
    <BaseManagementPage
      apiData="/tasks"
      pageTitle={t("HEADING.TASK_MANAGEMENT")}
      heading={t("HEADING.TASK_MANAGEMENT")}
      breadcrumbs={breadcrumbs}
      columns={columns}
      filters={filters}
      canAddNewRecord={false}
      shouldShowCheckbox={false}
    />
  );
};

export default Management;
