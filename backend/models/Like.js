const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        allowNull: false,
        onDelete: 'cascade'
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        allowNull: false,
        onDelete: 'cascade'
      });

    }
  };
  Like.init({
    // like: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // dislike: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};