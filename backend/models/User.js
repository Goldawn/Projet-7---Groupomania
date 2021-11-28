const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        allowNull: false,
        onDelete: 'cascade'
      });
      models.User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        allowNull: false,
        onDelete: 'cascade'
      });
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};