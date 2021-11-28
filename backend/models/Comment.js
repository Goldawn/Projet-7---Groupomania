const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        allowNull: false,
        onDelete: 'cascade'
      });

      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        allowNull: false,
        onDelete: 'cascade'
      });

    }
  };
  Comment.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attachment: DataTypes.STRING,
    likesCounter: DataTypes.INTEGER,
    dislikesCounter: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'Comments',
    modelName: 'Comment',
  });
  return Comment;
};