const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'post_body',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: [
                    'id',
                    'comment_body',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    const posts = userPosts.map(post => post.get ({ plain: true }));
    console.log(posts.length)
    const postlength = posts.length
    console.log(req.session.username)
    res.render('dashboard', {
        posts,
        postlength,
        username: req.session.username,
        loggedIn: true
    })
}
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;