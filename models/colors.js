export default (sequelize, DataTypes) => {
  const Color = sequelize.define("Color", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
    colorId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  });

  Color.associate = (model) => {
    // Project Association with other models
    Color.belongsToMany(model.Project, {
      through: "Project_Color",
      as: "color",
      onDelete: "cascade",
    });
    Color.belongsToMany(model.Label, {
      through: "Label_Color",
      onDelete: "cascade",
    });
    Color.belongsToMany(model.Filter, {
      through: "Filter_Color",
      onDelete: "cascade",
    });
  };

  return Color;
};
