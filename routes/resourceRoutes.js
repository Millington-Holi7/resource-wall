const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');


//the links in here start with /resources/

router.get('/', (req, res) => {
  console.log(req.session)
  userQueries.getUserPosts(req.session.user_id)
    .then(posts => {

      const templateVars = { posts, user: req.session.user_id }
      res.render('resources', templateVars);
    })

});

router.get('/:resourceId', (req, res) => {

  userQueries.getPostById(req.params.resourceId, req.session.user_id)
    .then(post => {
      const templateVars = { post, user: post.user_id }
      res.render('resource', templateVars);
    })

});

module.exports = router;

