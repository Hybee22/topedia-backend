export default (sequelize, DataTypes) => {
  const Label = sequelize.define("Label", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    colorId: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    labelId: {
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

  Label.associate = (model) => {
    // Project Association with other models
    Label.belongsTo(model.User);

    Label.belongsToMany(model.Color, {
      through: "Label_Color",
      onDelete: "cascade",
    });
    Label.belongsToMany(model.Task, {
      through: "Task_Label",
      onDelete: "cascade",
    });
    Label.belongsToMany(model.SubTask, {
      through: "SubTask_Label",
      onDelete: "cascade",
    });
  };

  return Label;
};
