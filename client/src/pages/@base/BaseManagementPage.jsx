import { useState } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// material
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import qs from "qs";

import EmptyContent from "src/components/EmptyContent";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Loader from "src/components/Loader";
// components
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import { useData } from "src/hooks";
import {
  DEFAULT_PAGE_SIZE,
  INPUT_TYPE,
  PAGE_SIZE_OPTIONS,
} from "src/utils/constant";

import { TableHeader, TableToolbar } from "./components";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

// ----------------------------------------------------------------------

const BaseManagementPage = (props) => {
  const {
    apiData,
    breadcrumbs,
    heading,
    pageTitle,
    columns,
    headingBtns,
    shouldShowCheckbox = true,
    handleDeleteMany,
    filters,
    isLoadingForOptions,
  } = props;

  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [params, setParams] = useState({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    filters: null,
  });

  const {
    items: rows,
    pagination,
    isLoading,
    mutate,
  } = useData(`${apiData}?${qs.stringify(params)}`);

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: rows || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
  });

  const defaultValues = useMemo(() => {
    let result = {};
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        result[filter.name] = filter.default;
      });
    }
    return result;
  }, [filters]);

  const { control, reset, handleSubmit, getValues, setValue } = useForm({
    defaultValues,
  });

  const handleFilter = handleSubmit(async (data) => {
    let _filters = [];
    const fieldsWithText = [
      "originalName",
      "name",
      "username",
      "assetId",
      "title",
    ];
    const fieldsWithAutocomplete = ["systemId", "personId"];
    const fieldsWithSelect = [
      "type",
      "status",
      "isActivated",
      "jobType",
      "taskType",
    ];

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter.type === INPUT_TYPE.DATE) {
          if (data.startDate && data.endDate) {
            _filters.push({
              key: "createdAt",
              operator: "between",
              value: [
                new Date(data.startDate).toLocaleString(),
                new Date(data.endDate).toLocaleString(),
              ],
            });
          }
          if (data.startDate && !data.endDate) {
            _filters.push({
              key: "createdAt",
              operator: ">=",
              value: new Date(data.startDate).toLocaleString(),
            });
          }
          if (data.endDate && !data.startDate) {
            _filters.push({
              key: "createdAt",
              operator: "<=",
              value: new Date(data.endDate).toLocaleString(),
            });
          }
        } else if (filter.type === INPUT_TYPE.SELECT) {
          fieldsWithSelect.forEach((item) => {
            if (
              item === filter.name &&
              data[item] !== null &&
              data[item] !== undefined &&
              data[item] !== "all"
            ) {
              _filters.push({
                key: item,
                operator: "=",
                value: data[item],
              });
            }
          });
        } else if (filter.type === INPUT_TYPE.AUTOCOMPLETE) {
          fieldsWithAutocomplete.forEach((item) => {
            if (
              item === filter.name &&
              data[item] !== null &&
              data[item] !== undefined
            ) {
              _filters.push({
                key: item,
                operator: "=",
                value: data[item],
              });
            }
          });
        } else if (
          filter.type === INPUT_TYPE.TEXT ||
          filter.type === INPUT_TYPE.SEARCH
        ) {
          fieldsWithText.forEach((item) => {
            if (
              item === filter.name &&
              data[item] !== "" &&
              data[item] !== null &&
              data[item] !== undefined
            ) {
              _filters.push({
                key: item,
                operator: "contain",
                value: data[item],
              });
            }
          });
        }
      });
    }

    setParams((prev) => ({
      ...prev,
      filters: encodeURI(JSON.stringify(_filters)),
    }));
  });
  const handleResetFilter = () => {
    reset({ ...defaultValues });
    setParams((prev) => ({
      ...prev,
      filters: null,
    }));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setParams((prev) => ({
      ...prev,
      page: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      pageSize: parseInt(event.target.value, 10),
    }));
  };

  useEffect(() => {
    let defaultValues = {};
    if (filters && filters.length > 0) {
      filters.forEach((item) => {
        defaultValues[item.name] = item.default;
      });
    }
    reset({ ...defaultValues });
  }, [reset, filters]);

  return (
    <Page title={pageTitle}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={heading}
          links={
            breadcrumbs || [
              {
                name: "",
                href: "",
              },
            ]
          }
          action={
            <Stack direction="row" alignItems="center" spacing={1}>
              {headingBtns &&
                headingBtns.map((btn, index) => {
                  if (btn.type === "action")
                    return (
                      <LoadingButton
                        key={index}
                        loading={btn.isLoading}
                        variant="contained"
                        startIcon={<Iconify icon={btn.icon} />}
                        color={btn.color}
                        onClick={btn.handler}
                      >
                        {btn.name}
                      </LoadingButton>
                    );
                  return (
                    <Button
                      key={index}
                      variant="contained"
                      component={RouterLink}
                      to={btn.href}
                      startIcon={<Iconify icon={btn.icon} />}
                      color={btn.color}
                    >
                      {btn.name}
                    </Button>
                  );
                })}
            </Stack>
          }
        />

        <Card>
          <CardHeader
            title={
              <TableToolbar
                selected={selected}
                setSelected={setSelected}
                filters={filters}
                isLoadingForOptions={isLoadingForOptions}
                handleFilter={handleFilter}
                handleResetFilter={handleResetFilter}
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleDeleteMany={handleDeleteMany}
              />
            }
            sx={{ p: 0 }}
          />

          <CardContent sx={{ p: 0 }}>
            <Stack>
              <Scrollbar>
                <TableContainer>
                  <Table size="small">
                    <TableHeader
                      order={order}
                      orderBy={orderBy}
                      getHeaderGroups={getHeaderGroups}
                      rowCount={rows?.length || 0}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                      flexRender={flexRender}
                      shouldShowCheckbox={shouldShowCheckbox}
                    />

                    {!isLoading && rows && rows?.length > 0 && (
                      <TableBody>
                        {getRowModel().rows.map((row) => {
                          const { id } = row.original;
                          const isItemSelected = selected.indexOf(id) !== -1;
                          return (
                            <TableRow
                              key={row.id}
                              role="checkbox"
                              selected={isItemSelected}
                              hover
                            >
                              {shouldShowCheckbox && (
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    onChange={(event) => handleClick(event, id)}
                                  />
                                </TableCell>
                              )}
                              {row.getVisibleCells().map((cell) => {
                                if (cell.column.id === "id")
                                  return (
                                    <TableCell key={cell.id}>
                                      <Tooltip
                                        title={flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                        )}
                                        arrow
                                      >
                                        <Typography
                                          sx={{
                                            maxWidth: "100%",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                          )}
                                        </Typography>
                                      </Tooltip>
                                    </TableCell>
                                  );
                                return (
                                  <TableCell
                                    key={cell.id}
                                    sx={{ maxWidth: 256 }}
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Stack>

            {isLoading && <Loader />}
            {!isLoading && rows && rows.length === 0 && <EmptyContent />}
          </CardContent>

          <TablePagination
            rowsPerPageOptions={PAGE_SIZE_OPTIONS}
            component="div"
            count={pagination?.totalItems || 0}
            rowsPerPage={params.pageSize}
            page={params.page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

BaseManagementPage.defaultProps = {
  columns: [],
};

BaseManagementPage.propTypes = {
  apiData: PropTypes.string,
  breadcrumbs: PropTypes.array,
  heading: PropTypes.string,
  pageTitle: PropTypes.string,
  columns: PropTypes.array,
  actions: PropTypes.array,
  shouldShowCheckbox: PropTypes.bool,
  handleDeleteMany: PropTypes.func,
  filters: PropTypes.array,
  isLoadingForOptions: PropTypes.bool,
};

export default BaseManagementPage;
