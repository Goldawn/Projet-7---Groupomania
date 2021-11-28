const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {
      models.User.belongsToMany(
        models.Post,
        {
          as: 'fk_userId',
          through: 'like',
          foreignKey: 'userId',
          otherKey: 'postId',
        }
      );
    
      models.Post.belongsToMany(
        models.User,
        {
          as: 'fk_postId',
          through: 'like',
          foreignKey: 'postId',
          otherKey: 'userId',
        }
      );

      console.log("tet",models)
    
      models.like.belongsTo(models.Post, { foreignKey: 'postId' });
      models.like.belongsTo(models.User, { foreignKey: 'userId' });
      models.User.hasMany(models.like, { foreignKey: 'userId' });
      models.Post.hasMany(models.like, { foreignKey: 'postId' });
    }
  };
  Like.init({
    isLike: DataTypes.BOOLEAN
  }, {
    modelName: 'like',
    sequelize
  });

  Like.beforeSync(() =>
    console.log('before creaing the Like table')
  );
  Like.afterSync(() =>
    console.log('before creaing the Like table')
  );
  return Like;
};