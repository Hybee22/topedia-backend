import { v4 } from "uuid";
import taskService from "../../services/task-service.js";
import { errorResMsg, successResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const appEmitter = global.appEmitter;

const logger = Logger;

class TaskController {
  async createTask(req, res) {
    try {
      const {
        title,
        description,
        priority,
        projectId,
        dueDate,
        dueTime,
        userId,
      } = req.body;
      const taskId = v4();

      const task = await taskService.createTask({
        title,
        description,
        priority,
        projectId,
        dueDate,
        dueTime,
        userId,
        taskId,
      });

      return successResMsg(res, 201, {
        message: `Task ${title} created successfully`,
        data: task,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while adding task",
      });
    }
  }
}

export default new TaskController();
