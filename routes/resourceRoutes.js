const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const cookieSession = require("cookie-session");

router.get('/', (req, res) => {
  userQueries.getUserPosts(req.session.userId)
    .then(posts => {
      console.log(posts)
      const templateVars = { posts, user: req.session.userId }
      res.render('resources', templateVars);
    })

});

router.get('/:resourceId', (req, res) => {
  userQueries.getPostById(req.params.resourceId)
    .then(post => {
      console.log(post)
      const templateVars = { post, user: req.session.userId }
      res.render('resource', templateVars);
    })

});

module.exports = router;

