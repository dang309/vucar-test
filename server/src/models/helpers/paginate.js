export const paginate = async (
  Model,
  query,
  attributes,
  include,
  { page, pageSize }
) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const finalQuery = {
    ...query,
    offset,
    limit,
    attributes,
  };

  if (include) {
    finalQuery.include = include;
  }

  const rows = await Model.findAll(finalQuery);

  const totalItems = await Model.count();
  const totalPages = Math.ceil(totalItems / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const data = {
    items: rows,
    currentItemCount: rows.length,
    itemsPerPage: pageSize,
    totalItems,
    totalPages,
    nextPage,
    prevPage,
  };

  return {
    data,
  };
};
