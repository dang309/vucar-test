import { Person } from "../models/index.js";
import BaseManager from "./base.manager.js";

class PersonManager extends BaseManager {
  constructor() {
    super(Person);
  }
}

export default PersonManager;
