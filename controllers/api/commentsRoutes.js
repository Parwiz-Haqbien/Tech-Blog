const { Post, User, Comment} = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            include: {
                model: User,
                attributes: ['username']
            }
        })
        res.status(200).json(commentData)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// create new comment by user 
router.post('/', withAuth, async (req, res) => {
    try{
        const newComment = await Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.status(200).json(newComment)
    }
    catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
});

// update comment by the user 
router.put('/:id', withAuth, async (req, res) => {
    const theComment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    if (req.session.user_id === theComment.user_id) {
        try {
            const updateComment = await Comment.update({
                comment_body: req.body.comment_body,
            },
            {
                where: {
                    id: req.params.id
                },
            })
            res.status.json(updateComment)
        }
        catch (err) {
            res.status(400).json(err)
        }
    }
});

// delete comment by the user 
router.delete('/:id', withAuth, async (req, res) => {
    const theComment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    console.log(theComment)
    console.log(theComment.user_id)
    console.log(req.session.user_id)

    if (req.session.user_id === theComment.user_id) {
        try {
            const oneComment = await Comment.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(oneComment)
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    }
});

module.exports = router;