import models from "../models/index.js";

const { Project, SubTask, Label } = models;

class SubTaskService {
  async createSubTask(data) {
    const subTaskRes = await SubTask.create({
      ...data,
      UserUserId: data.userId,
      TaskTaskId: data.taskId,
    });

    return subTaskRes;
  }
}

export default new SubTaskService();
