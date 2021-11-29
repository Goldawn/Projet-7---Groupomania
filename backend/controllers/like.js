const models   = require('../models');
const jwt = require('../middlewares/jwt');

// Constants

// const DISLIKED = 0;
// const LIKED    = 1;

// exports.likePost = async (req, res, next) => {

//     const headerAuth = req.headers['authorization'];
//     const userId = jwt.getUserId(headerAuth);

//     const postId = parseInt(req.params.postId);

//     if (postId <= 0) {
//         return res.status(400).json({ 'error': 'invalid parameters' });
//     }

//     try {
//         const post = await models.Post.findOne({ where: { id: postId } })
//         const user = await models.User.findOne({ where: { id: userId } })
//         // console.log(post, user)

//         console.log(models)

 


//         try {
//             const like = models.Post.findAll({
//                 include: [{
//                     model:models.like, 
//                     through: { where: { userId: userId, postId: postId } }
//                 }]
//             })
//         } catch(errs) {
//             console.log(errs)
//         }

//         console.log("jioj ",like)
//         if (!like) {
//             post.addUser(user, { isLike: LIKED })
//             post.update({ likesCounter: post.likesCounter +1})
//                 return res.status(200).json('post updated')
//         } else {
//             if(like.isLike === DISLIKED) {
//             like.update({ isLike: LIKED })
//             post.update({ likesCounter: post.dislikesCounter -1})
//             post.update({ likesCounter: post.likesCounter +1})
//                 return res.status(200).json('post updated else')
//             }
//             else {
//                 res.status(409).json({ 'error': 'post already liked' });
//             }
//         }           
//     }

//     catch(err) {
//         return res.status(500).json({ 'error': err });
//     }
    
// }

// exports.dislikePost = (req, res, next) => {
    
    
//     const headerAuth = req.headers['authorization'];
//     const userId = jwt.getUserId(headerAuth);

//     const postId = parseInt(req.params.postId);

//     if (postId <= 0) {
//         return res.status(400).json({ 'error': 'invalid parameters' });
//     }

//     try {

//         console.log(postId);
//         const post = models.Post.findOne({ where: { id: postId } })
//         const user = models.User.findOne({ where: { id: userId } })
//         const like = models.Like.findOne({ where : { userId: userId, postId: postId } })
        
//         if (!like) {
//             post.addUser(user, { isLike: DISLIKED })
//             post.update({ dislikesCounter: post.dislikesCounter +1})
//         } else {
//             if(like.isLike === LIKED) {
//             like.update({ isLike: DISLIKED })
//             post.update({ Counter: post.dislikesCounter +1})
//             post.update({ likesCounter: post.likesCounter -1})
//             }
//             else {
//                 res.status(409).json({ 'error': 'post already liked' });
//             }
//         }   

//     }

//     catch(err) {
//         return res.status(500).json({ 'error': 'Something went wrong' });
//     }
// }

exports.addLikeDislike = async(req, res, next) => {
    
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const postId = req.params.postId;

    try {
        const post = await models.Post.findOne({ where: { id: postId } })
        const usersLikedArray = post.usersLiked;
        const usersDislikedArray = post.usersDisliked;
        const likesCounter = post.likes;
        const dislikesCounter = post.dislikes;

        if (req.body.like === 1 && !usersLikedArray.includes(userId)){
  
          usersLikedArray.push(userId);
          likesCounter ++;

          post.usersLiked = usersLikedArray;
          post.likes = likesCounter;
          post.save();

        }
        
        else if (req.body.like === 0){
  
          if(usersLikedArray.includes(userId)) {
            usersLikedArray = usersLikedArray.filter( e => e !== userId );
            likesCounter--;
          }
  
          else {
            usersDislikedArray = usersDislikedArray.filter( e => e !== userId );
            dislikesCounter--;
          }
      
          post.usersLiked = usersLikedArray;
          post.usersDisliked = usersDislikedArray;
          post.likes = likesCounter;
          post.dislikes = dislikesCounter;
          post.save();
        }
      
        else if (req.body.like === -1 && !usersDislikedArray.includes(userId)){
      
          usersDislikedArray.push(userId);
          dislikesCounter++;
  
          post.usersDisliked = usersDislikedArray;
          post.dislikes = dislikesCounter;
          post.save();
        }
        else {
          console.log("exit if function")
        } 

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ 'error': err });
    }
}

