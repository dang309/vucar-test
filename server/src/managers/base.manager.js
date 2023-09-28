import httpStatus from "http-status";
import ApiError from "../helpers/ApiError.js";
import { TABLE_OPERATION_SEQUELIZE } from "../constants/common.js";

class BaseManager {
  constructor(Model) {
    this.model = Model;

    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.count = this.count.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
  }

  async create(body) {
    const data = await this.model.create(body);
    return {
      data,
    };
  }

  async find(page = 1, pageSize = 8, filters) {
    const query = { order: [["createdAt", "desc"]] };
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
    return { data };
  }

  async findOne(id) {
    const data = await this.model.findByPk(id);

    return {
      data,
    };
  }

  async count() {
    const data = await this.model.count();
    return { data };
  }

  async update(id, body) {
    const entry = await this.model.findByPk(id);

    if (!entry) throw new ApiError(httpStatus.BAD_REQUEST, "Not found item!");

    entry.set(body);

    entry.save();

    return {
      data: {
        id: entry.id,
      },
    };
  }

  async delete(id) {
    const data = await this.model.destroy({
      where: { id },
      individualHooks: true,
    });

    return {
      data,
    };
  }

  async deleteMany(ids) {
    const data = await this.model.destroy({
      where: { id: ids },
      individualHooks: true,
    });

    return {
      data,
    };
  }
}

export default BaseManager;
