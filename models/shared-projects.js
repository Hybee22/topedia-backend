export default (sequelize, DataTypes) => {
  const SharedProject = sequelize.define("SharedProject", {
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
    sharedProjectId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SharedProject.associate = (model) => {
    // SharedProject Association with other models
    // SharedProject.belongsTo(model.User, { foreignKey: "userId" });
    SharedProject.belongsToMany(model.User, {
      as: "sharedProjects",
      through: "User_SharedProject",
    });
    SharedProject.hasMany(model.Project, {
      foreignKey: "sharedProjectId",
    });
  };

  return SharedProject;
};
