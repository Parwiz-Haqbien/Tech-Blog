const router = require('express').Router();
const { Post } = require('../../models');
const useAuth = require('../../utils/auth')

router.post('/', useAuth, async( req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body, 
            user_id: req.session.user_id
        });
        res.redirect('/dashboard');
    } catch(err) {
        res.status(500).json(err)
    }
});

router.put('/:id', useAuth, async( req, res) => {
    try {
        const postUpdates = await Post.update({
            ...req.body, 
            user_id: req.session.user_id
        },
        {
            where: {
                id: req.params.id
            }
        });
       res.status(200).json([postUpdates])
    } catch(err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', useAuth, async( req, res) => {
    try {
        const deletePost = await Post.destroy({
            ...req.body, 
             id: req.params.id
        },
        {
            where: {
                id: req.params.id
            }
        });
       res.status(200).json([deletePost])
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;




  
  