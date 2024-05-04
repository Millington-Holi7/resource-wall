const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const cookieSession = require("cookie-session");

//the links in here start with /resources/

router.get('/', (req, res) => {
  userQueries.getUserPosts(req.session.userId)
    .then(posts => {
      console.log(posts)
      const templateVars = { posts, user: req.session.userId }
      res.render('resources', templateVars);
    })

});

router.get('/:resourceId', (req, res) => {
  userQueries.getPostById(req.params.resourceId, req.session.userId)
    .then(post => {
 
      const templateVars = { post, user: post.user_id }
      res.render('resource', templateVars);
    })

});

module.exports = router;

