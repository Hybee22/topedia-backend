export default (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    colorId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    projectId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Project.associate = (model) => {
    // Project Association with other models
    Project.belongsTo(model.SharedProject, {
      foreignKey: { name: "sharedProjectId" },
      onDelete: "cascade",
    });
    Project.belongsTo(model.User, {
      foreignKey: "userId",
      as: "projects",
      onDelete: "cascade",
    });
    Project.hasMany(model.Task, {
      foreignKey: "projectId",
      as: "tasks",
      onDelete: "cascade",
    });
    Project.belongsToMany(model.Color, {
      through: "Project_Color",
      as: "color",
      onDelete: "cascade",
    });
    Project.hasMany(model.Comment, {
      foreignKey: "projectId",
      as: "comments",
      onDelete: "cascade",
    });
  };

  return Project;
};
