import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { SettingAPI } from "src/api";
import { useLocales } from "src/hooks";
// components
import BaseFormPage from "src/pages/@base/BaseFormPage";
import { PATH_DASHBOARD } from "src/routes/paths";
// routes
import { INPUT_TYPE, SETTING_DATATYPE, SETTING_TYPE } from "src/utils/constant";

const Form = () => {
  const { id } = useParams();

  const { t } = useLocales();

  const [setting, setSetting] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    if (id) {
      setIsLoading(true);
      SettingAPI.getOne(id)
        .then((res) => {
          if (res.status === 200) {
            let setting = res.data.data;
            setSetting(setting);
          }
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  };

  const formInputs = [
    {
      name: "code",
      type: INPUT_TYPE.TEXT,
      required: true,
      disabled: false,
      readOnly: false,
      default: setting?.code || "",
      label: t("LABEL.CODE"),
    },

    {
      name: "title",
      type: INPUT_TYPE.TEXT,
      required: true,
      disabled: false,
      readOnly: false,
      default: setting?.title || "",
      label: t("LABEL.TITLE"),
    },

    {
      name: "type",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: t("OPTION.PRIVATE"),
          value: "private",
        },
        {
          name: t("OPTION.PUBLIC"),
          value: "public",
        },
      ],
      required: true,
      disabled: false,
      readOnly: false,
      default: setting?.type || "public",
      label: t("LABEL.TYPE"),
    },

    {
      name: "desc",
      type: INPUT_TYPE.TEXT,
      required: true,
      disabled: false,
      readOnly: false,
      default: setting?.desc || "",
      label: t("LABEL.DESC"),
      span: {
        lg: 12,
        sm: 12,
      },
    },

    {
      name: "dataType",
      type: INPUT_TYPE.SELECT,
      options: SETTING_DATATYPE,
      required: true,
      disabled: true,
      readOnly: false,
      default: setting?.dataType || 2,
      label: t("LABEL.DATA_TYPE"),
      span: {
        lg: 6,
        sm: 6,
      },
    },

    {
      name: "value",
      type: INPUT_TYPE.TEXT,
      options: SETTING_TYPE,
      required: true,
      disabled: false,
      readOnly: false,
      default: setting?.value || "",
      label: t("LABEL.VALUE"),
      span: {
        lg: 6,
        sm: 6,
      },
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.SETTING"),
      href: PATH_DASHBOARD.webMaster.setting.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.webMaster.setting.form,
    },
  ];

  const handleSaveData = (dataToSave) => {
    if (id) {
      return SettingAPI.update(id, dataToSave);
    } else {
      return SettingAPI.create(dataToSave);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t("HEADING.SETTING_FORM")}
      heading={t("HEADING.SETTING_FORM")}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
      isLoading={isLoading}
    />
  );
};

export default Form;
