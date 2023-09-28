import searchFill from "@iconify/icons-eva/search-fill";
import { Icon } from "@iconify/react";
import {
  Box,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
// material
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

import { MIconButton } from "src/components/@material-extend";
import Iconify from "src/components/Iconify";
import { useLocales } from "src/hooks";

import { Filter } from ".";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

// ----------------------------------------------------------------------

const TableToolbar = ({
  selected,
  setSelected,
  filters,
  isLoadingForOptions,
  control,
  getValues,
  setValue,
  handleFilter,
  handleResetFilter,
  handleDeleteMany,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle
      sx={{
        ...(selected &&
          selected.length > 0 && {
            color: isLight ? "primary.main" : "text.primary",
            bgcolor: isLight ? "primary.lighter" : "primary.dark",
          }),
      }}
    >
      {selected && selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selected && selected.length} selected
        </Typography>
      ) : (
        <>
          {filters && (
            <Filter
              filters={filters}
              isLoadingForOptions={isLoadingForOptions}
              control={control}
              getValues={getValues}
              setValue={setValue}
              handleFilter={handleFilter}
              handleResetFilter={handleResetFilter}
            />
          )}
        </>
      )}

      {selected && selected.length > 0 && (
        <Tooltip title="Delete" arrow>
          <MIconButton
            onClick={() =>
              handleDeleteMany(selected, () => {
                setSelected([]);
              })
            }
          >
            <Iconify icon="eva:trash-2-outline" />
          </MIconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
};

TableToolbar.propTypes = {
  selected: PropTypes.array,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default TableToolbar;
