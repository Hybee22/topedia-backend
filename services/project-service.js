import models from "../models/index.js";
const { Project, Color, Label, Task, SubTask, Comment, User } = models;

class ProjectService {
  async createProject(data) {
    const projectRes = await Project.create({
      ...data,
      UserUserId: data.userId,
    });

    const color = await Color.findOne({ where: { colorId: data.colorId } });

    const a = await projectRes.addColor(color, {
      through: {
        ColorColorId: data.colorId,
        ProjectProjectId: data.projectId,
      },
    });

    return projectRes;
  }

  async getProjects(data) {
    const { userId } = data;
    const projectRes = await Project.findAll({
      where: { userId },
      include: [
        {
          model: Color,
          as: "color",
          attributes: ["name", "code", "colorId"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: ["name", "projectId", "archived", "colorId", "favorite"],
    });

    return projectRes;
  }

  async getProject(data) {
    const { projectId } = data;
    const projectRes = await Project.findOne({
      where: { projectId },
      include: [
        {
          model: Color,
          as: "color",
          attributes: ["name", "code", "colorId"],
          through: {
            attributes: [],
          },
        },
        {
          model: Comment,
          as: "comments",
          attributes: [
            "text",
            "userId",
            "commentId",
            "projectId",
            "taskId",
            "subTaskId",
          ],
          include: {
            model: User,
            as: "user",
            attributes: ["userId", "name"],
          },
        },
        {
          model: Task,
          as: "tasks",
          attributes: [
            "title",
            "description",
            "dueDate",
            "dueTime",
            "priority",
            "taskId",
            "userId",
            "completed",
            "assignedTo",
          ],
          include: [
            {
              model: SubTask,
              as: "subTasks",
              attributes: [
                "title",
                "description",
                "dueDate",
                "dueTime",
                "priority",
                "taskId",
                "subTaskId",
                "userId",
                "completed",
                "assignedTo",
              ],
              include: [
                {
                  model: Comment,
                  as: "comments",
                  attributes: [
                    "text",
                    "userId",
                    "commentId",
                    "projectId",
                    "taskId",
                    "subTaskId",
                  ],
                  include: {
                    model: User,
                    as: "user",
                    attributes: ["userId", "name"],
                  },
                },
              ],
            },
            {
              model: Comment,
              as: "comments",
              attributes: [
                "text",
                "userId",
                "commentId",
                "projectId",
                "taskId",
                "subTaskId",
              ],
              include: {
                model: User,
                as: "user",
                attributes: ["userId", "name"],
              },
            },
          ],
        },
      ],
      attributes: ["name", "projectId", "archived", "colorId", "favorite"],
    });

    return projectRes;
  }

  async updateProject(projectId, data) {
    return await Project.update({ ...data }, { where: { projectId } });
  }
}

export default new ProjectService();
