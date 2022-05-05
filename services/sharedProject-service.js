import models from "../models/index.js";
const { SharedProject, Project, User } = models;

class SharedProjectService {
  async create(data) {
    const sharedProjectRes = await SharedProject.create({
      ...data,
      UserUserId: data.userId,
    });

    const user = await User.findOne({
      where: { userId: data.userId },
    });

    await user.addSharedProject(sharedProjectRes, {
      through: {
        UserUserId: data.userId,
        SharedProjectSharedProjectId: data.sharedProjectId,
      },
    });

    return sharedProjectRes;
  }

  async getSharedProjects(data) {
    const { projectId } = data;
    const sharedProjectRes = await SharedProject.findAll({
      where: { projectId },
      include: [
        {
          model: User,
          //   as: "color",
          attributes: ["name", "userId"],
          through: {
            attributes: [],
          },
        },
      ],
      //   attributes: [
      //     "name",
      //     "projectId",
      //     "archived",
      //     "colorId",
      //     "shared",
      //     "favorite",
      //   ],
    });

    return sharedProjectRes;
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
      attributes: [
        "name",
        "projectId",
        "archived",
        "colorId",
        "shared",
        "favorite",
      ],
    });

    return projectRes;
  }

  async updateProject(projectId, data) {
    return await Project.update({ ...data }, { where: { projectId } });
  }
}

export default new SharedProjectService();
