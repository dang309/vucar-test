import { useParams } from "react-router-dom";

import BaseFormPage from "src/pages/@base/BaseFormPage";
import { PATH_DASHBOARD } from "src/routes/paths";

const Form = () => {
  const { id } = useParams();

  const formInputs = [];

  const breadcrumbs = [
    {
      name: "Backup",
      href: PATH_DASHBOARD.webMaster.backup.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.webMaster.backup.form,
    },
  ];

  const handleSaveData = (dataToSave) => { };

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle="Backup Form"
      heading="Backup"
      formInputs={formInputs}
      handleSaveData={handleSaveData}
    />
  );
};

export default Form;
