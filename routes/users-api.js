/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

//USERS CRUD REST API

//CREATE - POST /
router.post('/', (req, res) => {
  console.log(req.body);
  const {email, password, confirmPassword} = req.body;

  const newUser = {email, password};
  userQueries.createUser(newUser)
  .then(user => {
    // res.json({message: "User created", user});
    res.redirect('/dashboard');
  })
})

//READ ALL - GET /
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//READ ONE - GET /:id
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.json({message: "User found"})
})

//UPDATE - POST /:id
router.post('/:id', (req, res) => {
  console.log(req.params.id);
  res.json({message: "User updated"})
})

//DELETE - POST /:id/delete
router.post('/:id/delete', (req, res) => {
  console.log(req.params.id);
  res.json({message: "User deleted"})
})



module.exports = router;
