"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init(
    {
      name: DataTypes.STRING,
      mimeType: DataTypes.STRING,
      data: DataTypes.BLOB,
      sector: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "File",
    }
  );
  return File;
};