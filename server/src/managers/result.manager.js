import { Result } from "../models/index.js";
import BaseManager from "./base.manager.js";

class ResultManager extends BaseManager {
  constructor() {
    super(Result);
  }

  async create(body) {
    const { userId, carId, criterionId, isGood, note } = body;
    let data = await this.model.findOne({
      where: {
        carId,
        criterionId,
      },
    });
    if (!data) {
      data = await this.model.create({
        carId,
        criterionId,
        isGood,
        note,
        createdBy: userId,
        updatedBy: userId,
      });
    } else {
      data.isGood = isGood;
      data.note = note;
      data.updatedBy = userId;
      await data.save();
    }
    return { data };
  }
}

export default ResultManager;
