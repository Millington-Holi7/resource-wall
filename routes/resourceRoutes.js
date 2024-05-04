const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const cookieSession = require("cookie-session");

router.get('/', (req, res) => {
  userQueries.getUserPosts(req.session.userId)
    .then(posts => {
      console.log(posts)
      const templateVars = { posts }
      res.render('resources', templateVars);
    })

});

router.get('/:resourceId', (req, res) => {
  userQueries.getPostById(req.params.resourceId)
    .then(post => {
      console.log(post)
      const templateVars = { post }
      res.render('resource', templateVars);
    })

});

router.get('/search', (req, res) => {
  userQueries.getResource(req.params)
    .then(post => {
      console.log(post)
      const templateVars = { post }
      res.render('search', templateVars);
    })

});


module.exports = router;

