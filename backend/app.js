const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const likeRoutes = require('./routes/like')
const commentRoutes = require('./routes/comment')
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/vote/', likeRoutes);
app.use('/api/posts/:postId/comments/', commentRoutes);


module.exports = app;