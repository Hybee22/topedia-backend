export default (sequelize, DataTypes) => {
  const SubTask = sequelize.define("SubTask", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dueTime: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM("p1", "p2", "p3", "p4"),
      allowNull: true,
      defaultValue: "p4",
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    subTaskId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  SubTask.associate = (model) => {
    // Project Association with other models
    SubTask.belongsTo(model.User);
    SubTask.belongsTo(model.Task);
    SubTask.belongsToMany(model.Label, {
      through: "SubTask_Label",
      onDelete: "cascade",
    });
    SubTask.hasMany(model.Comment, {
      foreignKey: "subTaskId",
      as: "comments",
      onDelete: "cascade",
    });
  };

  return SubTask;
};
