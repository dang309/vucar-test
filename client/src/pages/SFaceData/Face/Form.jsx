import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { FaceAPI, PersonAPI, SystemAPI } from "src/api";
import { useLocales } from "src/hooks";
import BaseFormPage from "src/pages/@base/BaseFormPage";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const Form = () => {
  const { id } = useParams();

  const { t } = useLocales();

  const [face, setFace] = useState();
  const [systemOptions, setSystemOptions] = useState();
  const [defaultSystemOption, setDefaultSystemOption] = useState();
  const [defaultPersonOption, setDefaultPersonOption] = useState();
  const [personOptions, setPersonOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadFace = async () => {
    if (id) {
      return FaceAPI.getOne(id)
        .then((res) => {
          if (res.status === 200) {
            const face = res.data.data;
            setDefaultSystemOption(face.systemId);
            setDefaultPersonOption(face.personId);
            setFace(face);
          }
        })
        .catch((err) => err);
    }
  };

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

  const loadData = async () => {
    setIsLoading(true);
    await loadFace();
    await loadOptions();
    setIsLoading(false);
  };

  const formInputs = [
    {
      name: "systemId",
      type: INPUT_TYPE.AUTOCOMPLETE,
      options: systemOptions,
      required: true,
      disabled: false,
      readOnly: false,
      default: defaultSystemOption,
      label: t("LABEL.SYSTEM"),
    },

    {
      name: "personId",
      type: INPUT_TYPE.AUTOCOMPLETE,
      options: personOptions,
      required: true,
      disabled: false,
      readOnly: false,
      default: defaultPersonOption,
      label: t("LABEL.PERSON"),
    },

    {
      name: "assetId",
      type: INPUT_TYPE.TEXT,
      required: false,
      disabled: false,
      readOnly: false,
      default: face?.assetId || "",
      label: t("LABEL.ASSET_ID"),
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.FACE"),
      href: PATH_DASHBOARD.sfaceData.face.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.sfaceData.face.form,
    },
  ];

  const handleSaveData = async (dataToSave) => {
    if (id) {
      return FaceAPI.update(id, dataToSave).catch((err) => err);
    } else {
      return FaceAPI.create(dataToSave).catch((err) => err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t("HEADING.FACE_FORM")}
      heading={t("HEADING.FACE_FORM")}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
      isLoading={isLoading}
    />
  );
};

export default Form;
