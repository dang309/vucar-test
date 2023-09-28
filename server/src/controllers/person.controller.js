import PersonManager from "../managers/person.manager.js";
import BaseController from "./base.controller.js";

class PersonController extends BaseController {
  constructor() {
    super(new PersonManager());
  }
}

export default PersonController;
