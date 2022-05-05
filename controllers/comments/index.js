import { v4 } from "uuid";
import commentService from "../../services/comment-service.js";
import { errorResMsg, successResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const appEmitter = global.appEmitter;

const logger = Logger;

class CommentController {
  async createComment(req, res) {
    try {
      const { userId, projectId, taskId, text, subTaskId } = req.body;
      const commentId = v4();

      const commentToCreate = {
        text,
        commentId,
        userId,
        projectId,
        taskId,
        subTaskId,
      };

      const comment = await commentService.createComment(commentToCreate);
      return successResMsg(res, 201, {
        message: "Comment added successfully",
        data: comment,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while creating comment",
      });
    }
  }
}

export default new CommentController();
