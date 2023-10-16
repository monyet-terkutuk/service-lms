const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nim: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["admin", "mentor", "student"],
        defaultValue: "student",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  return User;
};
