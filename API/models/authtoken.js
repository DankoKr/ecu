"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class authToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      authToken.belongsTo(models.User, { foreignKey: "user", as: "user_id" });
    }
  }

  authToken.init(
    {
      user: DataTypes.INTEGER,
      userRole: DataTypes.STRING,
      token: DataTypes.STRING,
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "authToken",
    }
  );

  authToken.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(
      expiredAt.getSeconds() + parseInt(process.env.JWT_REFRESH_EXPIRATION)
    );
    let _token = uuidv4();
    let refreshToken = await authToken.create({
      token: _token,
      user: user.id,
      userRole: user.role,
      expiryDate: expiredAt,
    });
    return refreshToken.token;
  };

  authToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return authToken;
};
