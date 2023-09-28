import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
// material
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const TableHeader = ({
  order,
  orderBy,
  rowCount,
  getHeaderGroups,
  flexRender,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  shouldShowCheckbox,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {shouldShowCheckbox && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          )}
          {headerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              align={header.alignRight ? "right" : "left"}
              sortDirection={orderBy === header.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === header.id}
                direction={orderBy === header.id ? order : "asc"}
                onClick={createSortHandler(header.id)}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {orderBy === header.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};

TableHeader.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  getHeaderGroups: PropTypes.func,
  flexRender: PropTypes.func,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default TableHeader;
