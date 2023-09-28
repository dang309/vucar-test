import { CarManager } from "../managers/index.js";
import BaseController from "./base.controller.js";

class CarController extends BaseController {
  constructor() {
    super(new CarManager());
  }
}

export default CarController;
