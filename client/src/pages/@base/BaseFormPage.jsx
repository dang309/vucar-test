import { useMemo } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
// material
import {
  Autocomplete,
  Box,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
// components
import Page from "src/components/Page";
import { useLocales } from "src/hooks";
// routes
import { getDirtyValues } from "src/utils/common";
import { INPUT_TYPE } from "src/utils/constant";

// ----------------------------------------------------------------------

const BaseFormPage = ({
  id,
  breadcrumbs,
  heading,
  pageTitle,
  formInputs,
  handleSaveData,
  isLoading,
}) => {
  const { t } = useLocales();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isDirty, dirtyFields, isSubmitting },
  } = useForm({
    defaultValues: useMemo(() => {
      let result = {};
      formInputs.forEach((item) => {
        if (item.type === "text") {
          result[item.name] = "";
        } else if (item.type === "number") {
          result[item.name] = 0;
        } else if (item.type === "SELECT" || item.type === "select") {
          result[item.name] = item.options[0].value;
        } else if (item.type === "autocomplete") {
          result[item.name] = "";
        }
      });
      return result;
    }, [formInputs]),
  });

  const onSubmit = handleSubmit(async (data) => {
    let dataToSave = data;
    if (id) {
      if (isDirty) {
        dataToSave = getDirtyValues(dirtyFields, data);
      }
    }
    return handleSaveData(dataToSave);
  });

  useEffect(() => {
    let defaultValues = {};
    formInputs.forEach((item) => {
      defaultValues[item.name] = item.default;
    });
    reset({ ...defaultValues });
  }, [reset, formInputs]);

  return (
    <Page title={pageTitle}>
      <Container
        // maxWidth="lg"
        maxWidth={false}
        component="form"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <HeaderBreadcrumbs
          heading={heading}
          links={breadcrumbs || [{ name: "", href: "" }]}
          action={
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              startIcon={<Iconify icon="eva:save-outline" />}
            >
              {t("BUTTON.SAVE")}
            </LoadingButton>
          }
        />

        <Card sx={{ p: 2 }}>
          <Grid container spacing={2} justifyContent="flex-start">
            {formInputs &&
              formInputs.map((input) => {
                if (input.hidden) return null;
                if (
                  input.type === INPUT_TYPE.TEXT ||
                  input.type === INPUT_TYPE.NUMBER ||
                  input.type === INPUT_TYPE.LINK
                )
                  return (
                    <Grid
                      key={input.name}
                      item
                      lg={input.span ? input.span.lg : 4}
                      md={input.span ? input.span.md : 4}
                      sm={input.span ? input.span.sm : 6}
                      xs={input.span ? input.span.xs : 12}
                    >
                      <Stack spacing={2}>
                        <Box>
                          {isLoading && (
                            <Skeleton variant="rounded" height={56} />
                          )}
                          {!isLoading && (
                            <Controller
                              name={input.name}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    required={input.required}
                                    type={input.type}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    fullWidth
                                    autoComplete="disabled"
                                    disabled={input.disabled}
                                    InputLabelProps={{
                                      shrink: Boolean(field.value),
                                    }}
                                    InputProps={{
                                      readOnly: input.readOnly,
                                    }}
                                    inputProps={
                                      input.type === "number"
                                        ? {
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }
                                        : {}
                                    }
                                  />
                                );
                              }}
                            />
                          )}
                        </Box>

                        {input.type === INPUT_TYPE.LINK && (
                          <Box sx={{ width: "100%" }}>
                            <img
                              loading="lazy"
                              src={getValues(input.name)}
                              alt=""
                              style={{
                                width: "100%",

                                borderRadius: "8px",
                              }}
                            />
                          </Box>
                        )}
                      </Stack>
                    </Grid>
                  );
                if (input.type === INPUT_TYPE.SELECT)
                  return (
                    <Grid
                      key={input.name}
                      item
                      lg={input.span ? input.span.lg : 4}
                      md={input.span ? input.span.md : 4}
                      sm={input.span ? input.span.sm : 6}
                      xs={input.span ? input.span.xs : 12}
                    >
                      {isLoading && <Skeleton variant="rounded" height={56} />}
                      {!isLoading && input.options && (
                        <Controller
                          control={control}
                          name={input.name}
                          render={({ field }) => {
                            return (
                              <FormControl fullWidth>
                                <InputLabel>{input.label}</InputLabel>
                                <Select
                                  disabled={input.disabled}
                                  label={input.label}
                                  defaultValue={2}
                                  fullWidth
                                  {...field}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  {input.options.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.name}
                                        value={option.value}
                                      >
                                        {option.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            );
                          }}
                        />
                      )}
                    </Grid>
                  );
                if (input.type === INPUT_TYPE.AUTOCOMPLETE) {
                  return (
                    <Grid
                      key={input.name}
                      item
                      lg={input.span ? input.span.lg : 4}
                      md={input.span ? input.span.md : 4}
                      sm={input.span ? input.span.sm : 6}
                      xs={input.span ? input.span.xs : 12}
                    >
                      {isLoading && <Skeleton variant="rounded" height={56} />}

                      {!isLoading && input.options && (
                        <Controller
                          name={input.name}
                          control={control}
                          render={({ field }) => {
                            if (!field.value) return;
                            return (
                              <Autocomplete
                                freeSolo
                                options={input.options}
                                value={input.options.find(
                                  (option) => option.id === field.value
                                )}
                                onChange={(_, newValue) => {
                                  if (newValue && newValue.id) {
                                    setValue(input.name, newValue.id);
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder={input.placeholder}
                                    label={input.label}
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: "disabled", // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                            );
                          }}
                        />
                      )}
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};

export default BaseFormPage;
