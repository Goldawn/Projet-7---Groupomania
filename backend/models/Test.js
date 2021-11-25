'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Test.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        allowNull: false,
        onDelete: 'CASCADE'
      });

      models.Test.belongsTo(models.Post, {
        foreignKey: 'postId',
        allowNull: false,
        onDelete: 'CASCADE'
      });

    }
  };
  Test.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'tests',
    modelName: 'Test',
  });
  return Test;
};