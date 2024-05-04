const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.post("/resources/:resourceId/like", (req, res) => {
  const { resourceId } = req.params;
  const { alreadyLiked } = req.body;
  const { userId } = req.session;
  console.log(req.body);
  if (JSON.parse(alreadyLiked)) {
    userQueries.removeLike(userId, resourceId).then((dbRes) => {
      res.json({ liked: false }); //IF AJAX

    });
  } else {
    userQueries.addLike(userId, resourceId).then((dbRes) => {
      res.json({ liked: true });

    });
  }
});


//Search is working
//comment rate and like,
//update profile

module.exports = router;


