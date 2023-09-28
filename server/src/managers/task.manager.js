import { Task } from "../models/index.js";
import BaseManager from "./base.manager.js";

class TaskManager extends BaseManager {
  constructor() {
    super(Task);
  }
}

export default TaskManager;
