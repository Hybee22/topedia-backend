export default (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
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
      allowNull: false,
      defaultValue: "p4",
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    taskId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    projectId: {
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

  Task.associate = (model) => {
    // Project Association with other models
    Task.belongsTo(model.User);
    Task.belongsTo(model.Project);
    Task.hasMany(model.SubTask, { as: "subTasks", onDelete: "cascade" });
    Task.belongsToMany(model.Label, {
      through: "Task_Label",
      onDelete: "cascade",
    });
    Task.hasMany(model.Comment, {
      foreignKey: "taskId",
      as: "comments",
      onDelete: "cascade",
    });
  };

  return Task;
};
