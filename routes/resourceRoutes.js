const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');


//the links in here start with /resources/

router.get('/', (req, res) => {
  userQueries.getUserPosts(req.session.user_id)
    .then(posts => {

      const templateVars = { posts, user: req.session }
      res.render('resources', templateVars);
    })

});

router.get('/:resourceId', (req, res) => {

  userQueries.getPostById(req.params.resourceId, req.session.user_id)
    .then(post => {
      const templateVars = { post, user: req.session }
      res.render('resource', templateVars);
    })

});

module.exports = router;

