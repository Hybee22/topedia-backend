import { v4 } from "uuid";
import subTaskService from "../../services/subTask-service.js";
import { errorResMsg, successResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const appEmitter = global.appEmitter;

const logger = Logger;

class SubTaskController {
  async createSubTask(req, res) {
    try {
      const { title, description, priority, taskId, dueDate, dueTime, userId } =
        req.body;
      const subTaskId = v4();

      const subTask = await subTaskService.createSubTask({
        title,
        description,
        priority,
        taskId,
        dueDate,
        dueTime,
        userId,
        subTaskId,
      });

      return successResMsg(res, 201, {
        message: `Sub-task "${title}" created successfully`,
        data: subTask,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while adding task",
      });
    }
  }
}

export default new SubTaskController();
