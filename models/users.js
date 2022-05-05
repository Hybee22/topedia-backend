export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING(250),
      allowNull: true,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpire: DataTypes.BIGINT,
  });

  User.associate = (model) => {
    // User Association with other models
    User.hasMany(model.Project, {
      as: "projects",
      onDelete: "cascade",
    });
    User.belongsToMany(model.SharedProject, {
      as: "sharedProjects",
      through: "User_SharedProject",
    });
    User.hasMany(model.Activity, {
      as: "activities",
      onDelete: "cascade",
    });
    User.hasMany(model.Filter, {
      as: "filters",
      onDelete: "cascade",
    });
    User.hasMany(model.Label, {
      as: "labels",
      onDelete: "cascade",
    });
    User.hasMany(model.Comment, {
      as: "comments",
      onDelete: "cascade",
    });
    User.hasMany(model.Notification, {
      as: "notifications",
      onDelete: "cascade",
    });

    //   User.hasMany(model.Comment, {
    //     onDelete: "cascade",
    //   });
  };

  return User;
};
