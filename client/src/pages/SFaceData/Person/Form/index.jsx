import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { PersonAPI, SystemAPI } from "src/api";
import { useLocales } from "src/hooks";
import BaseFormPage from "src/pages/@base/BaseFormPage";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

const Form = () => {
  const { id } = useParams();

  const { t } = useLocales();

  const [person, setPerson] = useState();
  const [systemOptions, setSystemOptions] = useState();
  const [defaultSystemOption, setDefaultSystemOption] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadPerson = async () => {
    if (id) {
      return PersonAPI.getOne(id)
        .then((res) => {
          if (res.status === 200) {
            const person = res.data.data;
            setDefaultSystemOption(person.systemId);
            setPerson(person);
          }
        })
        .catch((err) => err)
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const loadOptions = async () => {
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
        setIsLoading(false);
      });
  };

  const loadData = async () => {
    setIsLoading(true);
    await loadPerson();
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
      name: "name",
      type: INPUT_TYPE.TEXT,
      required: true,
      disabled: false,
      readOnly: false,
      default: person?.name || "",
      label: t("LABEL.NAME"),
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.PERSON"),
      href: PATH_DASHBOARD.sfaceData.person.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.sfaceData.person.form,
    },
  ];

  const handleSaveData = (dataToSave) => {
    if (id) {
      return PersonAPI.update(id, dataToSave);
    } else {
      return PersonAPI.create(dataToSave);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t("HEADING.PERSON_FORM")}
      heading={t("HEADING.PERSON_FORM")}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
      isLoading={isLoading}
    />
  );
};

export default Form;
