/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    //
    name: "session", //name could be anything but make sure context is there
    keys: ["key1", "key2"],
  })
);

//USERS CRUD REST API

//CREATE - POST /
router.post("/register", (req, res) => {
  // console.log('______________________', req.body);
  const {username, email, password, profile_pic } = req.body;


  const newUser = {username, email, password, profile_pic}; //DONT FORGET TO IMPLEMENT URL

  userQueries.getUserWithEmail(email).then(user => {
    if (user && user.id){
      //will reject
      return res.status(400).send({message: 'email already registered'})
    }

    userQueries.addUser(newUser).then(user => {
      if (user && user.id){
        req.session.user_id = user.id
        res.redirect("/");
      }
      // console.log('+++++++++++++++++++', user);
    })
  })
  //call user queries.getUserWithEmail to check if the email exists
  // if the user email exists

});

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

// //READ ONE - GET /:id
// router.get('/:id', (req, res) => {
//
// })

// //UPDATE - POST /:id
// router.post('/:id', (req, res) => {

//
// })

// //DELETE - POST /:id/delete
// router.post('/:id/delete', (req, res) => {
//
// })



module.exports = router;
