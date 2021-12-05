const models   = require('../models');
const jwt = require('../middlewares/jwt');

// exports.addLikeDislike = async(req, res, next) => {
    
//     const headerAuth = req.headers['authorization'];
//     const userId = jwt.getUserId(headerAuth)
//     const postId = req.params.postId;

//     try {
//         const post = await models.Post.findOne({ where: { id: postId } })
//         const usersLikedArray = post.usersLiked;
//         const usersDislikedArray = post.usersDisliked;
//         const likesCounter = post.likes;
//         const dislikesCounter = post.dislikes;

//         if (req.body.like === 1 && !usersLikedArray.includes(userId)){
  
//           usersLikedArray.push(userId);
//           likesCounter ++;

//           post.usersLiked = usersLikedArray;
//           post.likes = likesCounter;
//           post.save();

//         }
        
//         else if (req.body.like === 0){
  
//           if(usersLikedArray.includes(userId)) {
//             usersLikedArray = usersLikedArray.filter( e => e !== userId );
//             likesCounter--;
//           }
  
//           else {
//             usersDislikedArray = usersDislikedArray.filter( e => e !== userId );
//             dislikesCounter--;
//           }
      
//           post.usersLiked = usersLikedArray;
//           post.usersDisliked = usersDislikedArray;
//           post.likes = likesCounter;
//           post.dislikes = dislikesCounter;
//           post.save();
//         }
      
//         else if (req.body.like === -1 && !usersDislikedArray.includes(userId)){
      
//           usersDislikedArray.push(userId);
//           dislikesCounter++;
  
//           post.usersDisliked = usersDislikedArray;
//           post.dislikes = dislikesCounter;
//           post.save();
//         }
//         else {
//           console.log("exit if function")
//         } 

//     }
//     catch(err) {
//         console.log(err)
//         return res.status(500).json({ 'error': err });
//     }
// }

exports.createLike = async (req, res, next) => {

  const headerAuth = req.headers['authorization'];
  const userId = jwt.getUserId(headerAuth);
  const postId = parseInt(req.params.postId);


  try {
      const user = await models.User.findOne({ where: { id: userId } })
      const post = await models.Post.findOne({ where: { id: postId } })

      const userAlreadyLikes = await models.Like.findOne( { where: { userId: user.id, postId: post.id }} );
      if (userAlreadyLikes) {
          await userAlreadyLikes.destroy();
          res.status(200).json({ message : 'like deleted' })
      }

      else {
          const like = await models.Like.create({
              like: 1,
              dislike: 0,
              userId: user.id,
              postId: post.id
          })
    
          return res.json(like)
      }

  }

  catch(err) {
      console.log(err)
      return res.status(500).json({ err });
  }

}