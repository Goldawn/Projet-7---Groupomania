const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        allowNull: false,
        onDelete: 'cascade',
      });

      models.Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        allowNull: false,
        onDelete: 'cascade'
      });

      models.Post.hasMany(models.Like, {
        foreignKey: 'postId',
        as: 'likes',
        allowNull: false,
        onDelete: 'cascade'
      });

      // models.Post.belongsToMany(models.User, {
      //   through: 'like',
      //   as: 'usersLikedPost',
      //   foreignKey: 'postId',
      // });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
    // likesCounter: DataTypes.INTEGER,
    // dislikesCounter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};