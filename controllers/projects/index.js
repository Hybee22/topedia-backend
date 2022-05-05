import { v4 } from "uuid";
import projectService from "../../services/project-service.js";
import { errorResMsg, successResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const appEmitter = global.appEmitter;

const logger = Logger;

class ProjectController {
  async createProject(req, res) {
    try {
      const { name, colorId, userId } = req.body;
      const projectId = v4();

      const project = await projectService.createProject({
        name,
        colorId,
        projectId,
        userId,
      });
      return successResMsg(res, 200, {
        message: `Project ${name} created successfully`,
        data: project,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while creating project",
      });
    }
  }

  async getProjects(req, res) {
    try {
      const { userId } = req.user;
      const projects = await projectService.getProjects({ userId });

      return successResMsg(res, 200, {
        message: "Projects fetched successfully",
        data: projects,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching projects",
      });
    }
  }

  async getProject(req, res) {
    try {
      const { projectId } = req.params;
      const project = await projectService.getProject({ projectId });

      if (!project) {
        return errorResMsg(res, 404, {
          message: "Project not found",
        });
      }

      return successResMsg(res, 200, {
        message: "Project fetched successfully",
        data: project,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching project",
      });
    }
  }

  async updateProject(req, res) {
    try {
      const { projectId } = req.params;
      const { name, archived, favorite, color, shared } = req.body;

      const dataToUpdate = {
        name,
        archived,
        favorite,
        color,
        shared,
      };

      const updated = await projectService.updateProject(
        projectId,
        dataToUpdate
      );

      if (updated[0] === 1) {
        return successResMsg(res, 200, {
          message: `Project updated successfully`,
        });
      }

      return errorResMsg(res, 400, { message: "Update failed" });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while updating project",
      });
    }
  }
}

export default new ProjectController();
