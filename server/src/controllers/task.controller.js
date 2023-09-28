import TaskManager from "../managers/task.manager.js";
import BaseController from "./base.controller.js";

class TaskController extends BaseController {
  constructor() {
    super(new TaskManager());
  }
}

export default TaskController;
