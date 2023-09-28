import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { ModelAPI } from "src/api";
import { useLocales } from "src/hooks";
import BaseFormPage from "src/pages/@base/BaseFormPage";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const Form = () => {
  const { id } = useParams();

  const { t } = useLocales();

  const [model, setModel] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadModel = async () => {
    if (id) {
      ModelAPI.getOne(id).then((res) => {
        if (res.status === 200) {
          const model = res.data.data;
          setModel(model);
        }
      });
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    await loadModel();
    setIsLoading(false);
  };

  const formInputs = [
    {
      name: "alias",
      type: INPUT_TYPE.TEXT,
      required: true,
      readOnly: false,
      disabled: false,
      default: model?.alias || "",
      label: t("LABEL.ALIAS"),
    },

    {
      name: "isActivated",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: t("OPTION.TRUE"),
          value: 1,
        },
        {
          name: t("OPTION.FALSE"),
          value: 0,
        },
      ],
      default: model?.isActivated === true ? 1 : 0,
      required: true,
      disabled: false,
      label: t("LABEL.ACTIVATED"),
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.MODEL"),
      href: PATH_DASHBOARD.sfaceData.model.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.sfaceData.model.form,
    },
  ];

  const handleSaveData = async (dataToSave) => {
    if (id) {
      return ModelAPI.update(id, dataToSave).catch((err) => err);
    } else {
      return ModelAPI.create(dataToSave).catch((err) => err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t("HEADING.MODEL_FORM")}
      heading={t("HEADING.MODEL_FORM")}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
      isLoading={isLoading}
    />
  );
};

export default Form;
