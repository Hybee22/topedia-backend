export default (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  Notification.associate = (model) => {
    // Project Association with other models
    Notification.belongsTo(model.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };

  return Notification;
};
