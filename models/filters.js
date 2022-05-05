export default (sequelize, DataTypes) => {
  const Filter = sequelize.define("Filter", {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    query: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    colorId: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Filter.associate = (model) => {
    // Project Association with other models
    Filter.belongsTo(model.User);
    // Filter.hasOne(model.Color);
    Filter.belongsToMany(model.Color, {
      through: "Filter_Color",
      onDelete: "cascade",
    });
  };

  return Filter;
};
