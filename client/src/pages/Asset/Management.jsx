import { useState } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";
import { pink, red, teal, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { useSWRConfig } from "swr";

import { AssetAPI, SystemAPI } from "src/api";
import ExtractFaceDialog from "src/components/dialogs/ExtractFaceDialog";
import GalleryDialog from "src/components/dialogs/GalleryDialog";
import UploadAssetDialog from "src/components/dialogs/UploadAssetDialog";
import VerifyFaceDialog from "src/components/dialogs/VerifyFaceDialog";
import { useEventBus, useLocales } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

import { TableAction } from "../@base/components";

const apiData = "/assets";

const Management = () => {
  const { $emit } = useEventBus();

  const { mutate } = useSWRConfig();

  const [systemOptions, setSystemOptions] = useState();
  const [defaultSystemOption, setDefaultSystemOption] = useState();
  const [isLoadingForOptions, setIsLoadingForOptions] = useState(false);

  const { t } = useLocales();

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
    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.THUMB"),
      cell: (info) => {
        const { thumbPath, originalName } = info.row.original;

        return (
          <Box sx={{ width: 64, height: 64 }}>
            <img
              src={`${import.meta.env.VITE_API_ROOT}/${thumbPath}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${
                  import.meta.env.BASE_URL
                }/static/placeholder.svg`;
              }}
              alt={originalName}
              style={{
                height: "100%",
                width: "100%",

                objectFit: "cover",

                borderRadius: "8px",
              }}
            />
          </Box>
        );
      },
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

    columnHelper.accessor("assetId", {
      header: t("TABLE.COLUMN.ASSET"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("originalName", {
      header: t("TABLE.COLUMN.ORIGINAL_NAME"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.DIMENSION"),
      cell: (info) => {
        const { width, height } = info.row.original;
        if ((!width || !height) && width !== 0 && height !== 0) return null;
        return `${width}x${height}`;
      },
    }),

    columnHelper.accessor("size", {
      header: t("TABLE.COLUMN.SIZE"),
      cell: (info) => {
        const size = info.getValue();
        if (!size) return "0 MB";
        return (size / (1024 * 1024)).toFixed(2) + " MB";
      },
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ACTIONS"),
      cell: (info) => {
        const { id, path, faces } = info.row.original;
        const actions = [
          {
            name: t("BUTTON.PREVIEW"),
            icon: "eva:eye-outline",
            type: "action",
            handler: () => handlePreview(path, faces),
            color: yellow[700],
          },

          {
            name: t("BUTTON.VERIFY_FACE"),
            icon: "eva:pantone-outline",
            type: "action",
            handler: () => handleVerifyFace(id),
            color: teal[700],
          },

          {
            name: t("BUTTON.EXTRACT_FACE"),
            icon: "eva:scissors-outline",
            type: "action",
            handler: () => handleExtractFace(id),
            color: pink[700],
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

  const handlePreview = (path, faces) => {
    const src = `${import.meta.env.VITE_API_ROOT}/${path}`;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      $emit("dialog/gallery/open", { image: src, faces });
    };
    image.onerror = () => {
      $emit("dialog/gallery/open", {
        image: `${import.meta.env.BASE_URL}/static/placeholder.svg`,
        faces: null,
      });
    };
  };

  const handleDeleteOne = (id) => {
    $emit("dialog/confirmation/open", {
      title: t("DIALOG.TITLE.DELETE"),
      content: t("DIALOG.CONTENT.DELETE"),
      actionText: "Delete",
      actionHandler: async (cb) => {
        return AssetAPI.delete(id)
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

  const handleDeleteMany = (ids, callback) => {
    if (!ids) return;
    $emit("dialog/confirmation/open", {
      title: `${t("DIALOG.TITLE.DELETE")}`,
      content: `${t(
        `DIALOG.CONTENT.${ids.length > 1 ? "DELETE_MANY" : "DELETE"}`
      )}`,
      actionText: "Delete",
      actionHandler: async (cb) => {
        return AssetAPI.deleteMany(ids)
          .then(() => {
            if (callback) callback();
          })
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

  const handleUpload = () => {
    $emit("dialog/upload-asset/open");
  };

  const handleExtractFace = (id) => {
    $emit("dialog/extract-face/open", { assetId: id });
  };

  const handleVerifyFace = (id) => {
    $emit("dialog/verify-face/open", { assetId: id });
  };

  const headingBtns = [
    {
      name: t("BUTTON.UPLOAD"),
      icon: "eva:upload-outline",
      type: "action",
      handler: handleUpload,
      color: "primary",
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.ASSET"),
      href: PATH_DASHBOARD.asset.management,
    },
  ];

  const filters = [
    {
      name: "originalName",
      type: INPUT_TYPE.SEARCH,
      required: false,
      disabled: false,
      readOnly: false,
      default: "",
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
      default: null,
      label: t("LABEL.START_DATE"),
    },

    {
      name: "endDate",
      type: INPUT_TYPE.DATE,
      required: false,
      disabled: false,
      readOnly: false,
      default: null,
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
        pageTitle={t("HEADING.ASSET_MANAGEMENT")}
        heading={t("HEADING.ASSET_MANAGEMENT")}
        breadcrumbs={breadcrumbs}
        columns={columns}
        headingBtns={headingBtns}
        filters={filters}
        isLoadingForOptions={isLoadingForOptions}
        handleDeleteMany={handleDeleteMany}
      />
      <UploadAssetDialog />
      <GalleryDialog />
      <ExtractFaceDialog showPerson={true} />
      <VerifyFaceDialog />
    </>
  );
};

export default Management;
