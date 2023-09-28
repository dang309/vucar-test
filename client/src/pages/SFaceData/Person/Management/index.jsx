import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { green, pink, red, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { useSWRConfig } from "swr";

import { PersonAPI, SystemAPI } from "src/api";
import ExtractFacePersonDialog from "src/components/dialogs/ExtractFacePersonDialog";
import GalleryDialog from "src/components/dialogs/GalleryDialog";
import Iconify from "src/components/Iconify";
import { useEventBus, useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { TableAction } from "src/pages/@base/components";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";
import { useState } from "react";
import { useEffect } from "react";

const apiData = "/people";

const Management = () => {
  const { $emit } = useEventBus();

  const { mutate } = useSWRConfig();

  const { t } = useLocales();

  const [systemOptions, setSystemOptions] = useState();
  const [defaultSystemOption, setDefaultSystemOption] = useState();
  const [isLoadingForOptions, setIsLoadingForOptions] = useState(false);

  const loadOptions = async () => {
    setIsLoadingForOptions(true);
    return SystemAPI.getAll({ pageSize: 999 })
      .then((res) => {
        if (res.status === 200) {
          let system = res.data.data.items;
          if (!defaultSystemOption) {
            let defaultSystem = system.find((opt) => opt.isDefault).id;
            setDefaultSystemOption(defaultSystem);
          }
          system = system.map((item) => ({
            id: item.id,
            label: item.name,
          }));
          setSystemOptions(system);
        }
      })
      .catch((err) => err)
      .finally(() => {
        setIsLoadingForOptions(false);
      });
  };

  const columnHelper = createColumnHelper();

  const columns = [
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

    columnHelper.accessor("name", {
      header: t("TABLE.COLUMN.NAME"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ACTIONS"),
      cell: (info) => {
        const { id, isDefault, system, name } = info.row.original;
        // const { id, isDefault } = info.row.original;
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
          {
            name: t("BUTTON.EXTRACT_FACE"),
            icon: "eva:scissors-outline",
            type: "action",
            handler: () => handleExtractFace(id, system.id, name),
            color: pink[700],
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const handleAddFace = (id) => {};

  const handleDeleteOne = (id) => {
    $emit("dialog/confirmation/open", {
      title: t("DIALOG.TITLE.DELETE"),
      content: t("DIALOG.CONTENT.DELETE"),
      actionText: "Delete",
      actionHandler: async (cb) => {
        return PersonAPI.delete(id)
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
  // const handleExtractFace = (id) => {
  //   $emit("dialog/extract-face/open", { personId: id });
  // };
  const handleExtractFace = (id, systemId, personName) => {
    $emit("dialog/extract-face/open", { personId: id, systemId, personName });
    console.log({ personId: id, systemId, personName });
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
      name: t("BREADCRUMB.PERSON"),
      href: PATH_DASHBOARD.sfaceData.model.management,
    },
  ];

  const filters = [
    {
      name: "name",
      type: INPUT_TYPE.SEARCH,
      required: false,
      disabled: false,
      readOnly: false,
      placeholder: t("PLACEHOLDER.SEARCH"),
    },

    {
      name: "systemId",
      type: INPUT_TYPE.AUTOCOMPLETE,
      options: systemOptions,
      required: false,
      disabled: false,
      readOnly: false,
      default: defaultSystemOption,
      label: t("LABEL.SYSTEM"),
    },

    {
      name: "startDate",
      type: INPUT_TYPE.DATE,
      required: false,
      disabled: false,
      readOnly: false,
      label: t("LABEL.START_DATE"),
    },

    {
      name: "endDate",
      type: INPUT_TYPE.DATE,
      required: false,
      disabled: false,
      readOnly: false,
      label: t("LABEL.END_DATE"),
    },
  ];

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <>
      <BaseManagementPage
        apiData={apiData}
        pageTitle={t("HEADING.PERSON_MANAGEMENT")}
        heading={t("HEADING.PERSON_MANAGEMENT")}
        breadcrumbs={breadcrumbs}
        showSearch={true}
        columns={columns}
        filters={filters}
        isLoadingForOptions={isLoadingForOptions}
        headingBtns={headingBtns}
      />
      <GalleryDialog />
      <ExtractFacePersonDialog showPerson={false} showUpload={true} />
    </>
  );
};

export default Management;
