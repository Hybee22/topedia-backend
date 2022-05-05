export default (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentId: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taskId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Comment.associate = (model) => {
    // Project Association with other models
    Comment.belongsTo(model.User, { foreignKey: "userId", as: "user" });
    Comment.belongsTo(model.Project, { foreignKey: "projectId" });
    Comment.belongsTo(model.Task, { foreignKey: "taskId" });
    Comment.belongsTo(model.SubTask, { foreignKey: "taskId" });
  };

  return Comment;
};
