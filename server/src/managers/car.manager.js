import { Car } from "../models/index.js";
import BaseManager from "./base.manager.js";

class CarManager extends BaseManager {
  constructor() {
    super(Car);
  }
}

export default CarManager;
