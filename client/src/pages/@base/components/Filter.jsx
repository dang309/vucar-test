import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

import Iconify from "src/components/Iconify";
import { DATE_FORMAT, INPUT_TYPE } from "src/utils/constant";

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const Filter = ({
  isLoadingForOptions,
  control,
  getValues,
  setValue,
  filters,
  handleFilter,
  handleResetFilter,
}) => {
  return (
    filters && (
      <Stack direction="column" sx={{ p: 2, width: "100%" }} spacing={1}>
        <Grid container spacing={2} justifyContent="flex-start">
          {filters.map((filter) => {
            if (filter.hidden) return null;
            if (filter.type === INPUT_TYPE.SEARCH)
              return (
                <Grid
                  key={filter.name}
                  item
                  lg={filter.span ? filter.span.lg : 3}
                  md={filter.span ? filter.span.md : 3}
                  sm={filter.span ? filter.span.sm : 6}
                  xs={filter.span ? filter.span.xs : 12}
                >
                  <Stack spacing={2}>
                    <Box>
                      {isLoadingForOptions && (
                        <Skeleton variant="rounded" height={56} />
                      )}
                      {!isLoadingForOptions && (
                        <Controller
                          name={filter.name}
                          control={control}
                          render={({ field }) => {
                            return (
                              <SearchStyle
                                {...field}
                                required={filter.required}
                                type={filter.type}
                                label={filter.label}
                                placeholder={filter.placeholder}
                                fullWidth
                                autoComplete="disabled"
                                disabled={filter.disabled}
                                onKeyUp={(e) => {
                                  if (e.key === "Enter") handleFilter();
                                }}
                                InputLabelProps={{
                                  shrink: Boolean(field.value),
                                }}
                                InputProps={{
                                  readOnly: filter.readOnly,
                                }}
                              />
                            );
                          }}
                        />
                      )}
                    </Box>
                  </Stack>
                </Grid>
              );

            if (filter.type === INPUT_TYPE.DATE)
              return (
                <Grid
                  key={filter.name}
                  item
                  lg={filter.span ? filter.span.lg : 3}
                  md={filter.span ? filter.span.md : 3}
                  sm={filter.span ? filter.span.sm : 6}
                  xs={filter.span ? filter.span.xs : 12}
                >
                  <Stack spacing={2}>
                    <Box>
                      {isLoadingForOptions && (
                        <Skeleton variant="rounded" height={56} />
                      )}
                      {!isLoadingForOptions && (
                        <Controller
                          name={filter.name}
                          control={control}
                          render={({ field }) => {
                            return (
                              <DatePicker
                                {...field}
                                onChange={(newDate) => {
                                  field.onChange(
                                    moment(newDate).format(DATE_FORMAT)
                                  );
                                }}
                                required={filter.required}
                                type={filter.type}
                                label={filter.label}
                                placeholder={filter.placeholder}
                                fullWidth
                                autoComplete="disabled"
                                disabled={filter.disabled}
                                InputLabelProps={{
                                  shrink: Boolean(field.value),
                                }}
                                InputProps={{
                                  readOnly: filter.readOnly,
                                }}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                  },
                                }}
                              />
                            );
                          }}
                        />
                      )}
                    </Box>
                  </Stack>
                </Grid>
              );
            if (
              filter.type === INPUT_TYPE.TEXT ||
              filter.type === INPUT_TYPE.NUMBER ||
              filter.type === INPUT_TYPE.LINK
            )
              return (
                <Grid
                  key={filter.name}
                  item
                  lg={filter.span ? filter.span.lg : 3}
                  md={filter.span ? filter.span.md : 3}
                  sm={filter.span ? filter.span.sm : 6}
                  xs={filter.span ? filter.span.xs : 12}
                >
                  <Stack spacing={2}>
                    <Box>
                      {isLoadingForOptions && (
                        <Skeleton variant="rounded" height={56} />
                      )}
                      {!isLoadingForOptions && (
                        <Controller
                          name={filter.name}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                {...field}
                                required={filter.required}
                                type={filter.type}
                                label={filter.label}
                                placeholder={filter.placeholder}
                                fullWidth
                                autoComplete="disabled"
                                disabled={filter.disabled}
                                onKeyUp={(e) => {
                                  if (e.key === "Enter") handleFilter();
                                }}
                                InputLabelProps={{
                                  shrink: Boolean(field.value),
                                }}
                                InputProps={{
                                  readOnly: filter.readOnly,
                                }}
                                inputProps={
                                  filter.type === "number"
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

                    {filter.type === INPUT_TYPE.LINK && (
                      <Box sx={{ width: "100%" }}>
                        <img
                          loading="lazy"
                          src={getValues(filter.name)}
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
            if (filter.type === INPUT_TYPE.SELECT)
              return (
                <Grid
                  key={filter.name}
                  item
                  lg={filter.span ? filter.span.lg : 3}
                  md={filter.span ? filter.span.md : 3}
                  sm={filter.span ? filter.span.sm : 6}
                  xs={filter.span ? filter.span.xs : 12}
                >
                  {isLoadingForOptions && (
                    <Skeleton variant="rounded" height={56} />
                  )}
                  {!isLoadingForOptions && filter.options && (
                    <Controller
                      control={control}
                      name={filter.name}
                      render={({ field }) => {
                        return (
                          <FormControl fullWidth>
                            <InputLabel>{filter.label}</InputLabel>
                            <Select
                              disabled={filter.disabled}
                              label={filter.label}
                              fullWidth
                              {...field}
                              MenuProps={{ disableScrollLock: true }}
                            >
                              {filter.options &&
                                filter.options.map((option) => {
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
            if (filter.type === INPUT_TYPE.AUTOCOMPLETE) {
              return (
                <Grid
                  key={filter.name}
                  item
                  lg={filter.span ? filter.span.lg : 3}
                  md={filter.span ? filter.span.md : 3}
                  sm={filter.span ? filter.span.sm : 6}
                  xs={filter.span ? filter.span.xs : 12}
                >
                  {isLoadingForOptions && (
                    <Skeleton variant="rounded" height={56} />
                  )}

                  {!isLoadingForOptions && filter.options && (
                    <Controller
                      name={filter.name}
                      control={control}
                      render={({ field }) => {
                        if (!field.value) return;
                        return (
                          <Autocomplete
                            freeSolo
                            options={filter.options}
                            value={filter.options.find(
                              (option) => option.id === field.value
                            )}
                            onChange={(_, newValue) => {
                              if (newValue && newValue.id) {
                                setValue(filter.name, newValue.id);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder={filter.placeholder}
                                label={filter.label}
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

        <Stack direction="row" spacing={1} sx={{ alignSelf: "flex-end" }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Iconify icon="eva:refresh-outline" />}
            sx={{ alignSelf: "flex-end" }}
            onClick={handleResetFilter}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<Iconify icon="eva:funnel-outline" />}
            onClick={handleFilter}
          >
            Filter
          </Button>
        </Stack>
      </Stack>
    )
  );
};

export default Filter;
