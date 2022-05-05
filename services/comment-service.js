import models from "../models/index.js";
const { sequelize } = models;

const { Comment } = models;

class CommentService {
  async createComment(data) {
    const commentRes = await Comment.create({
      ...data,
      UserUserId: data.userId,
    });

    return commentRes;
  }
}

export default new CommentService();
