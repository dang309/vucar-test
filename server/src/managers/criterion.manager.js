import { TABLE_OPERATION_SEQUELIZE } from "../constants/common.js";
import { Criterion } from "../models/index.js";
import Utility from "../utils/utils.js";
import BaseManager from "./base.manager.js";

class CriterionManager extends BaseManager {
  constructor() {
    super(Criterion);
  }

  async find(page = 1, pageSize = 8, filters) {
    const query = { order: [["id", "asc"]] };
    const where = {};
    if (filters) {
      filters.forEach((filter) => {
        if (filter.operator === "contain") {
          Object.assign(where, {
            [filter.key]: {
              [TABLE_OPERATION_SEQUELIZE[filter.operator]]: `%${filter.value}%`,
            },
          });
        } else {
          Object.assign(where, {
            [filter.key]: {
              [TABLE_OPERATION_SEQUELIZE[filter.operator]]: filter.value,
            },
          });
        }
      });
    }

    if (Object.keys(where).length > 0) {
      query.where = where;
    }

    const { data } = await this.model.paginate(query, { page, pageSize });

    // split data by level
    // For example:
    // A (level 1)
    //  B (level 2)
    //   C (level 3)

    const { items } = data;
    const clone = Utility.groupByParent(items);

    data.items = clone;

    return { data };
  }
}

export default CriterionManager;
