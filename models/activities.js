export default (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    activity: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
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
    // subTaskId: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  });

  Activity.associate = (model) => {
    // Project Association with other models
    Activity.belongsTo(model.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };

  return Activity;
};
