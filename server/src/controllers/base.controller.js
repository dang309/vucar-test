import httpStatus from "http-status";
import _ from "lodash";
import moment from "moment";
import ApiError from "../helpers/ApiError.js";
import { NOT_FOUND } from "../constants/error.js";
import REST from "../utils/rest.js";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/common.js";

class BaseController {
  constructor(manager) {
    this.__manager = manager;

    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.count = this.count.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
  }

  async create(req, res) {
    const result = await this.__manager.create(req.body);

    return REST.postSuccess(res, result);
  }

  async find(req, res) {
    const page = _.parseInt(req.query.page) || DEFAULT_PAGE;
    const pageSize = _.parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
    const filters = req.query.filters
      ? JSON.parse(decodeURI(req.query.filters))
      : null;

    if (filters && filters.length > 0) {
      const createdAtFilter = filters.find(
        (filter) => filter.key === "createdAt"
      );
      if (createdAtFilter && createdAtFilter.value.length > 1) {
        if (
          moment(createdAtFilter.value[1]).isBefore(
            moment(createdAtFilter.value[0])
          )
        )
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Start date must be before End date!"
          );
      }
    }

    const result = await this.__manager.find(
      _.parseInt(page, 10),
      _.parseInt(pageSize, 10),
      filters
    );

    return REST.getSuccess(res, result);
  }

  async findOne(req, res) {
    const id = req.params.id;
    const result = await this.__manager.findOne(id);
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, NOT_FOUND);
    }
    return REST.getSuccess(res, result);
  }

  async count(req, res) {
    const result = await this.__manager.count();
    return REST.getSuccess(res, result);
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    const result = await this.__manager.update(id, body);
    return REST.putSuccess(res, result);
  }

  async delete(req, res) {
    const id = req.params.id;
    const result = await this.__manager.delete(id);
    return REST.deleteSuccess(res, result);
  }

  async deleteMany(req, res) {
    const ids = req.body.ids;
    const result = await this.__manager.deleteMany(ids);
    return REST.deleteSuccess(res, result);
  }
}

export default BaseController;
