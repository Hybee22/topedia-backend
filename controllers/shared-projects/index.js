import { v4 } from "uuid";
import sharedProjectService from "../../services/sharedProject-service.js";
import { errorResMsg, successResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";
import userService from "../../services/user-service.js";
import projectService from "../../services/project-service.js";

const appEmitter = global.appEmitter;

const logger = Logger;

class ProjectController {
  async sharedProject(req, res) {
    try {
      const { name, projectId, userId } = req.body;

      const sharedProjectId = v4();

      const user = await userService.findUserOnly({ userId });

      if (!user) {
        return errorResMsg(res, 404, { message: "User not found" });
      }

      const project = await projectService.getProject({ projectId });

      if (!project) {
        return errorResMsg(res, 404, { message: "Project not found" });
      }

      const sharedProjectRes = await sharedProjectService.create({
        name,
        projectId,
        sharedProjectId,
        userId,
      });

      return successResMsg(res, 200, {
        message: `Project ${name} shared with ${user.name} successfully`,
        data: project,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while sharing project",
      });
    }
  }

  async getSharedProjects(req, res) {
    try {
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching projects",
      });
    }
  }

  async getSharedProject(req, res) {
    try {
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching shared project",
      });
    }
  }

  async updateSharedProject(req, res) {
    try {
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while updating shared project",
      });
    }
  }
}

export default new ProjectController();
