const router = require('express').Router();
const sequelize = require('../config/connection');

const {
  User,
  Post,
  Comment
} = require('../models');
const useAuth = require('../utils/auth')

router.get('/' , useAuth, (req, res) => {
    Post.findAll({
        where: {
            id: req.session.user_id
          },
          attributes: [
            'id',
            'title',
            'content',
            'created_at'
          ],
          include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id' , 'user_id' , 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
              attributes: ['username']
          }
        ]
    })
    .then(postingData => {
        const posts = postingData.map( post => post.get ({
           plain: true
        }));
        res.render('dashboard', {
          posts,
          loggedIn: true
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
          },
          attributes: [
            'id',
            'title',
            'content',
            'created_at'
          ],
          include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id' , 'user_id' , 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
              attributes: ['username']
          }
        ]
    })
    .then(postingData => {
        if (!postingData) {
          res.status(404).json({
              message: 'No post is found with this id'
          });
          return;
      }
      const post = postingData.get({
        plain:true
      });
      res.render('edit-post' , {
        post,
        loggedIn: true
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})
router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
})

module.exports = router;