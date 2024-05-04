/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require("bcryptjs");

//USERS CRUD REST API

//CREATE - POST /


//READ ALL - GET /
// router.get('/', (req, res) => {

//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// //READ ONE - GET /:id


// CREATE POST

router.post('/create-post', (req, res) => {
  // Construct the post object correctly
  const post = {
    user_id: req.session.user_id,
    ...req.body // This assumes req.body includes topic_id, title, content_link_url, description
  };
  userQueries.addPost(post)
    .then(() => res.redirect('/resources'))
    .catch(error => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

// SEARCH
router.post('/search', (req, res) => {
  console.log('***', req);
  userQueries.getResource(req.body)
  res.redirect('/');
})



module.exports = router;
