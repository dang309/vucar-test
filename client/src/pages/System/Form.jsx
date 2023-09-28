import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SystemAPI } from "src/api";
import { useLocales } from "src/hooks";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

import BaseFormPage from "../@base/BaseFormPage";

const Form = () => {
  const { id } = useParams();
  
  const { t } = useLocales()

  const [system, setSystem] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    if (id) {
      setIsLoading(true);
      SystemAPI.getOne(id)
        .then((res) => {
          if (res.status === 200) {
            const system = res.data.data;
            setSystem(system);
          }
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  };

  const formInputs = [
    {
      name: "securityKey",
      type: INPUT_TYPE.TEXT,
      required: true,
      disabled: false,
      readOnly: false,
      default: system?.securityKey || "",
      label: t("LABEL.SECURITY_KEY"),
    },
    {
      name: "name",
      type: INPUT_TYPE.TEXT,
      required: false,
      disabled: false,
      readOnly: false,
      default: system?.name || "",
      label: t("LABEL.NAME"),
    },
    {
      name: "desc",
      type: INPUT_TYPE.TEXT,
      required: false,
      disabled: false,
      readOnly: false,
      default: system?.desc || "",
      label: t("LABEL.DESC"),
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.SYSTEM"),
      href: PATH_DASHBOARD.system.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.system.form,
    },
  ];

  const handleSaveData = (dataToSave) => {
    if (id) {
      return SystemAPI.update(id, dataToSave).catch((err) => err);
    } else {
      return SystemAPI.create(dataToSave).catch((err) => err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t('HEADING.SYSTEM_FORM')}
      heading={t('HEADING.SYSTEM_FORM')}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
      isLoading={isLoading}
    />
  );
};

export default Form;
