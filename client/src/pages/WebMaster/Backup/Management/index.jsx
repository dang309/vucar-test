import { useState } from "react";
import { useEffect } from "react";
import { cyan, red } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { constantCase } from "change-case";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useSWRConfig } from "swr";

import { BackupAPI } from "src/api";
import Label from "src/components/Label";
// components
import { useEventBus, useLocales, useSocketIO } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { TableAction } from "src/pages/@base/components";
import { useDispatch } from "src/redux/store";
import { PATH_DASHBOARD } from "src/routes/paths";

const apiData = "/sql-backup";

const Management = () => {
  const { socket } = useSocketIO();

  const { $emit } = useEventBus();

  const { mutate } = useSWRConfig();

  const { t } = useLocales();

  const dispatch = useDispatch();

  const [isLoadingForBackup, setIsLoadingForBackup] = useState(false);
  const [isLoadingForRefresh, setIsLoadingForRefresh] = useState(false);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: t("TABLE.COLUMN.NAME"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("status", {
      header: t("TABLE.COLUMN.STATUS"),
      cell: (info) => {
        const status = info.getValue();
        let color = "default";
        if (status === "error") color = "error";
        if (status === "progress") color = "warning";
        if (status === "success") color = "success";
        return <Label color={color}>{t(`STATUS.${constantCase(status)}`)}</Label>;
      },
    }),

    columnHelper.accessor("createdAt", {
      header: t("TABLE.COLUMN.CREATED_DATE"),
      cell: (info) => {
        const date = info.getValue();
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ACTIONS"),
      cell: (info) => {
        const { id, name, status } = info.row.original;
        const actions = [
          {
            name: t("BUTTON.DOWNLOAD"),
            icon: "eva:download-outline",
            type: "action",
            handler: () => handleDownload(name),
            color: cyan[700],
            disabled: status !== "success",
          },
          {
            name: t("BUTTON.DELETE"),
            icon: "eva:trash-2-outline",
            handler: () => handleDeleteOne(id),
            type: "action",
            color: red[700],
            disabled: status === "progress",
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const handleBackup = async () => {
    setIsLoadingForBackup(true);
    const name = moment().format("YYYY-MM-DD-HH-mm");
    return BackupAPI.create({ name })
      .then(() => {
        mutate((key) => typeof key === "string" && key.startsWith(apiData));
      })
      .catch((err) => err)
      .finally(() => {
        setIsLoadingForBackup(false);
      });
  };

  const handleRefresh = async () => {
    setIsLoadingForRefresh(true);
    setIsLoadingForRefresh(false);
  };

  const handleDeleteOne = (id) => {
    $emit("dialog/confirmation/open", {
      title: t("DIALOG.TITLE.DELETE"),
      content: t("DIALOG.CONTENT.DELETE"),
      actionText: "Delete",
      actionHandler: async (cb) => {
        return BackupAPI.delete(id)
          .then(() => {
            mutate((key) => typeof key === "string" && key.startsWith(apiData));
          })
          .then(() => {
            $emit("dialog/confirmation/close");
          })
          .catch((err) => err)
          .finally(() => {
            if (cb) cb();
          });
      },
    });
  };

  const handleDownload = async (name) => {
    return BackupAPI.download(name)
      .then((res) => {
        const href = window.URL.createObjectURL(res.data);

        const anchorElement = document.createElement("a");

        anchorElement.href = href;
        anchorElement.download = name + ".sql";

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
      })
      .then(() => {
        enqueueSnackbar(t("NOTI.SUCCESS"), { variant: "success" });
      })
      .catch((err) => err);
  };

  const headingBtns = [
    {
      name: t("BUTTON.BACKUP"),
      icon: "eva:cube-outline",
      type: "action",
      handler: handleBackup,
      color: "primary",
      isLoading: isLoadingForBackup,
    },
    {
      name: t("BUTTON.REFRESH"),
      icon: "eva:refresh-outline",
      type: "action",
      handler: handleRefresh,
      color: "secondary",
      isLoading: isLoadingForRefresh,
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.BACKUP"),
      href: PATH_DASHBOARD.webMaster.setting.management,
    },
  ];

  useEffect(() => {
    socket.on("sql-backup/done", () => {
      mutate((key) => typeof key === "string" && key.startsWith(apiData));
    });
  }, [socket, mutate]);

  return (
    <BaseManagementPage
      apiData={apiData}
      pageTitle={t("HEADING.BACKUP_MANAGEMENT")}
      heading={t("HEADING.BACKUP_MANAGEMENT")}
      breadcrumbs={breadcrumbs}
      showSearch={true}
      columns={columns}
      headingBtns={headingBtns}
      canAddNewRecord={false}
    />
  );
};

export default Management;
