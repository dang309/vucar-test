import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TaskAPI } from "src/api";
import { useData, useLocales } from "src/hooks";
import BaseFormPage from "src/pages/@base/BaseFormPage";
import { PATH_DASHBOARD } from "src/routes/paths";
import { GET_TYPE, INPUT_TYPE, STATUS_TYPE } from "src/utils/constant";

const Form = () => {
  const { id } = useParams();

  const {t} = useLocales()

  const { data: system } = useData("/system");

  const { data: task } = useData(id ? `/tasks/${id}` : null, GET_TYPE.SINGLE);

  const [systemOptions, setSystemOptions] = useState();

  useEffect(() => {
    if (!system) return;
    setSystemOptions(
      system.map((item) => ({ id: item.id, label: item.securityKey }))
    );
  }, [system]);

  const formInputs = [
    {
      name: "systemId",
      type: INPUT_TYPE.AUTOCOMPLETE,
      options: systemOptions,
      required: true,
      disabled: false,
      readOnly: false,
      default: task?.systemId || "",
      label: t("LABEL.SYSTEM"),
    },

    {
      name: "jobCode",
      type: INPUT_TYPE.TEXT,
      required: false,
      readOnly: false,
      disabled: false,
      default: task?.jobCode || "",
      label: "Job Code",
    },

    {
      name: "taskCode",
      type: INPUT_TYPE.TEXT,
      required: false,
      readOnly: false,
      disabled: false,
      default: task?.taskCode || "",
      label: "Task Type",
    },

    {
      name: "progress",
      type: "number",
      required: false,
      readOnly: false,
      disabled: false,
      default: task?.progress || 0,
      label: "Progress",
    },

    {
      name: "status",
      type: INPUT_TYPE.SELECT,
      options: [
        {
          name: "ERROR",
          value: STATUS_TYPE.ERROR,
        },
        {
          name: "IDLE",
          value: STATUS_TYPE.IDLE,
        },
        {
          name: "PROGRESS",
          value: STATUS_TYPE.PROGRESS,
        },
        {
          name: "DONE",
          value: STATUS_TYPE.DONE,
        },
      ],
      required: true,
      disabled: false,
      readOnly: false,
      default: task?.status || "",
      label: "Status",
    },
  ];

  const breadcrumbs = [
    {
      name: "Tasks",
      href: PATH_DASHBOARD.sfaceData.task.management,
    },
    {
      name: id ? t("BREADCRUMB.EDIT") : t("BREADCRUMB.CREATE"),
      href: PATH_DASHBOARD.sfaceData.task.form,
    },
  ];

  const handleSaveData = (dataToSave) => {
    if (id) {
      return TaskAPI.update(id, dataToSave);
    } else {
      return TaskAPI.create(dataToSave);
    }
  };

  return (
    <BaseFormPage
      id={id}
      breadcrumbs={breadcrumbs}
      pageTitle={t('HEADING.TASK_FORM')}
      heading={t('HEADING.TASK_FORM')}
      formInputs={formInputs}
      handleSaveData={handleSaveData}
    />
  );
};

export default Form;
