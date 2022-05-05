import models from "../models/index.js";
import hashService from "./hash-service.js";
import tokenService from "./token-service.js";

const { User, Project, Task, SubTask, Label, Color, Comment, SharedProject } =
  models;

class UserService {
  async register(data) {
    const { name, userId, email, password } = data;
    // Hash Password
    const hashedPassword = hashService.hashPassword(password);

    const dataToCreate = {
      name,
      userId,
      email,
      password: hashedPassword,
    };

    const userRes = await User.create(dataToCreate);
    // Generate Token
    const tokens = tokenService.generateTokens({ userId, email });
    return {
      user: userRes,
      tokens,
    };
  }

  async login(data) {
    let resp = {};
    const { email, password } = data;

    // Check if user exists
    const userExists = await this.findUser({ email });
    if (!userExists) return { message: "Email or password is incorrect!" };

    // Check if password matches
    const isPasswordMatch = hashService.comparePasswordHash(
      password,
      userExists.password
    );

    if (!isPasswordMatch) return { message: "Email or password is incorrect!" };

    // Generate Tokens
    const tokens = tokenService.generateTokens({
      userId: userExists.userId,
      email: userExists.email,
    });
    resp.tokens = tokens;

    // Add user data to resp object
    resp.user = userExists;
    // Return user
    return resp;
  }

  async findUserOnly(filter) {
    const user = await User.findOne({ where: { ...filter } });
    return user;
  }

  async findUser(filter) {
    const user = await User.findOne({
      where: { ...filter },
      include: [
        {
          model: SharedProject,
          as: "sharedProjects",
          attributes: ["id", "name", "projectId", "sharedProjectId"],
          through: {
            attributes: [],
          },
        },
        {
          model: Project,
          as: "projects",
          attributes: ["name", "projectId", "archived", "favorite", "userId"],
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
        },
      ],
    });
    return user;
  }
}

export default new UserService();
