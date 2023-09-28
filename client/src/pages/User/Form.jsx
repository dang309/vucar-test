import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserAPI } from "src/api";
import { useLocales } from "src/hooks";
import { PATH_DASHBOARD } from "src/routes/paths";
import { INPUT_TYPE } from "src/utils/constant";

import BaseFormPage from "../@base/BaseFormPage";

const Form = () => {
  const { id } = useParams();

  const { t } = useLocales();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    if (id) {
      setIsLoading(true);
      UserAPI.getOne(id)
        .then((res) => {
          if (res.status === 200) {
            const user = res.data.data;
            setUser(user);
          }
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  };

  const formInputs = [
    {
      name: "username",
      type: INPUT_TYPE.TEXT,
      required: true,
      disabled: false,
      default: user?.username || "",
      label: t("LABEL.USERNAME"),
    },

    {
      name: "type",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: t("OPTION.NORMAL"),
          value: 2,
        },
        {
          name: t("OPTION.ADMIN"),
          value: 3,
        },
      ],
      required: true,
      disabled: false,
      default: user?.type || 2,
      label: t("LABEL.TYPE"),
    },
  ];

  const breadcrumbs = [
    {
      name: t("BREADCRUMB.USER"),
      href: PATH_DASHBOARD.user.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.user.management,
    },
  ];

  const handleSaveData = async (dataToSave) => {
    if (id) {
      return UserAPI.update(id, dataToSave);
    } else {
      return UserAPI.create(dataToSave);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t("HEADING.USER_FORM")}
      heading={t("HEADING.USER_FORM")}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
      isLoading={isLoading}
    />
  );
};

export default Form;
