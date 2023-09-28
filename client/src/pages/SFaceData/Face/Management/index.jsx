import { useEffect } from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";
import { pink, red, yellow } from "@mui/material/colors";
import { createColumnHelper } from "@tanstack/react-table";
import { useSWRConfig } from "swr";

import { FaceAPI, PersonAPI, SystemAPI } from "src/api";
import GalleryDialog from "src/components/dialogs/GalleryDialog";
import { useEventBus, useLocales, useSocketIO } from "src/hooks";
import BaseManagementPage from "src/pages/@base/BaseManagementPage";
import { TableAction } from "src/pages/@base/components";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const apiData = "/faces";

const Management = () => {
  const { $emit } = useEventBus();

  const { mutate } = useSWRConfig();

  const [systemOptions, setSystemOptions] = useState();
  const [personOptions, setPersonOptions] = useState();
  const [defaultSystemOption, setDefaultSystemOption] = useState();
  const [defaultPersonOption, setDefaultPersonOption] = useState();
  const [isLoadingForOptions, setIsLoadingForOptions] = useState(false);

  const loadOptions = async () => {
    return Promise.all([
      SystemAPI.getAll({ pageSize: 999 }).then((res) => {
        if (res.status === 200) {
          let system = res.data.data.items;
          return system;
        }
      }),

      PersonAPI.getAll({ pageSize: 999 }).then((res) => {
        if (res.status === 200) {
          let people = res.data.data.items;
          return people;
        }
      }),
    ])
      .then((result) => {
        const [system, people] = result;
        if (system) {
          const tmp = system.map((item) => ({
            id: item.id,
            label: item.name,
          }));

          if (!defaultSystemOption) {
            const defaultOption = system.find((opt) => opt.isDefault).id;
            setDefaultSystemOption(defaultOption);
          }

          setSystemOptions(tmp);
        }

        if (people) {
          let tmp = people.map((item) => ({
            id: item.id,
            label: item.name || item.id,
          }));

          if (!defaultPersonOption) {
            const defaultOption = people.find((opt) => opt.isDefault).id;
            setDefaultPersonOption(defaultOption);
          }

          setPersonOptions(tmp);
        }
      })
      .catch((err) => err);
  };

  const { t } = useLocales();

  const { socket } = useSocketIO();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.THUMB"),
      cell: (info) => {
        const { id, path } = info.row.original;
        return (
          <Box sx={{ width: 64 }}>
            <img
              src={`${import.meta.env.VITE_API_ROOT}/${path}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${
                  import.meta.env.BASE_URL
                }/static/placeholder.svg`;
              }}
              alt={id}
              style={{
                height: "auto",
                width: "100%",

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

    columnHelper.accessor("person", {
      header: t("TABLE.COLUMN.PERSON"),
      cell: (info) => {
        const person = info.getValue();
        if (!person) return null;
        return (
          <Link
            component={RouterLink}
            to={`${window.location.origin}/sface/admin/sface-data/people/edit/${person?.id}`}
          >
            {person?.name}
          </Link>
        );
      },
    }),

    columnHelper.accessor("assetId", {
      header: t("TABLE.COLUMN.ASSET"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.SIZE"),
      cell: (info) => {
        const { original } = info.row;
        const { width, height } = original;
        if ((!width || !height) && width !== 0 && height !== 0) return null;
        return `${width}x${height}`;
      },
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.POSITION"),
      cell: (info) => {
        const { original } = info.row;
        const { posX, posY } = original;
        if ((!posX || !posY) && posX !== 0 && posY !== 0) return null;
        return `${posX}x${posY}`;
      },
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ORIGIN"),
      cell: (info) => {
        const { original } = info.row;
        const { orgWidth, orgHeight } = original;
        if ((!orgWidth || !orgHeight) && orgWidth !== 0 && orgHeight !== 0)
          return null;
        return `${orgWidth}x${orgHeight}`;
      },
    }),

    columnHelper.accessor("", {
      header: t("TABLE.COLUMN.ACTIONS"),
      cell: (info) => {
        const { id, asset } = info.row.original;
        const actions = [
          {
            name: t("BUTTON.EDIT"),
            icon: "eva:edit-outline",
            type: "link",
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
            name: t("BUTTON.PREVIEW"),
            icon: "eva:eye-outline",
            type: "action",
            handler: () => handlePreview(id, asset),
            color: pink[500],
          },
        ];
        return <TableAction id={id} actions={actions} />;
      },
    }),
  ];

  const handlePreview = (id, asset) => {
    const { path, faces } = asset;
    const src = `${import.meta.env.VITE_API_ROOT}/${path}`;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      $emit("dialog/gallery/open", { image: src, faces, faceId: id });
    };
    image.onerror = () => {
      $emit("dialog/gallery/open", {
        image: `${import.meta.env.BASE_URL}/static/placeholder.svg`,
      });
    };
  };

  const handleDeleteOne = (id) => {
    $emit("dialog/confirmation/open", {
      title: t("DIALOG.TITLE.DELETE"),
      content: t("DIALOG.CONTENT.DELETE"),
      actionText: "Delete",
      actionHandler: async (cb) => {
        return FaceAPI.delete(id)
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
        return FaceAPI.deleteMany(ids)
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

  const headingBtns = [];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.FACE"),
      href: PATH_DASHBOARD.sfaceData.face.management,
    },
  ];

  const filters = [
    {
      name: "assetId",
      type: INPUT_TYPE.SEARCH,
      required: false,
      disabled: false,
      readOnly: false,
      placeholder: t("PLACEHOLDER.SEARCH"),
      span: {
        lg: 4,
        md: 4,
        sm: 12,
      },
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
      span: {
        lg: 2,
        md: 2,
        sm: 12,
      },
    },

    {
      name: "personId",
      type: INPUT_TYPE.AUTOCOMPLETE,
      options: personOptions,
      required: false,
      disabled: false,
      readOnly: false,
      default: defaultPersonOption,
      label: t("LABEL.PERSON"),
      span: {
        lg: 2,
        md: 2,
        sm: 12,
      },
    },

    {
      name: "startDate",
      type: INPUT_TYPE.DATE,
      required: false,
      disabled: false,
      readOnly: false,
      label: t("LABEL.START_DATE"),
      span: {
        lg: 2,
        md: 2,
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
        lg: 2,
        md: 2,
        sm: 12,
      },
    },
  ];

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    socket.on("extract-face/done", () => {
      mutate((key) => typeof key === "string" && key.startsWith(apiData));
    });
  }, [socket, mutate]);

  return (
    <>
      <BaseManagementPage
        apiData={apiData}
        pageTitle={t("HEADING.FACE_MANAGEMENT")}
        heading={t("HEADING.FACE_MANAGEMENT")}
        breadcrumbs={breadcrumbs}
        showSearch={true}
        columns={columns}
        filters={filters}
        isLoadingForOptions={isLoadingForOptions}
        headingBtns={headingBtns}
        handleDeleteMany={handleDeleteMany}
      />
      <GalleryDialog />
    </>
  );
};

export default Management;
