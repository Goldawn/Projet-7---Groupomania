const models = require('../models');
const jwt = require('../middlewares/jwt');


exports.createTest = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);
    const postId = parseInt(req.params.postId);
    console.log(req.params)
    // const postId = 2;
    const title = req.body.title;
    const content = req.body.content;

    try {
        const user = await models.User.findOne({ where: { id: userId } })
        const post = await models.Post.findOne({ where: { id: postId } })
        const test = await models.Test.create({ 
            title: title,
            content: content,
            likes: 0,
            userId: user.id,
            postId: post.id 
        })

        return res.json(test)
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}

exports.modifyTest = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const testId = parseInt(req.params.testId);

    const title = req.body.title;
    const content = req.body.content;

    try {
        const test = await models.Test.findOne({ where: { userId: userId, id: testId } })

            test.title = title,
            test.content = content

            await test.save()

        return res.json(test)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }
}

exports.deleteTest = async (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth)
    const testId = parseInt(req.params.testId);

    try {
        const test = await models.Test.findOne({ where: { userId: userId, id: testId } })
        
            await test.destroy();

        res.status(200).json({ message : 'test deleted' })
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}

exports.getAllTests = async (req, res, next) => {

    try {
        const tests = await models.Test.findAll({ include: ['user', 'Post'] })
        
        return res.json(tests)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }

}