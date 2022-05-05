import models from "../models/index.js";

const { Project, Task, SubTask, Label } = models;

class TaskService {
  async createTask(data) {
    const taskRes = await Task.create({
      ...data,
      UserUserId: data.userId,
      ProjectProjectId: data.projectId,
    });

    return taskRes;
  }
}

export default new TaskService();
