import { Op } from "sequelize";

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE = 1;
export const TABLE_OPERATION_SEQUELIZE = {
  "=": Op.eq,
  ">": Op.gt,
  ">=": Op.gte,
  "<": Op.lt,
  "<=": Op.lte,
  between: Op.between,
  in: Op.in,
  contain: Op.like,
};
