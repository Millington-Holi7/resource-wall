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

router.post("/resources/:resourceId/comment", (req, res) => {
  const { resourceId } = req.params;
 const { userId } = req.session;
})

//Search is working
//comment rate and like,
//update profile

module.exports = router;


// IN THE PAGE

//<button>LIKE / UNLIKE </button>



//

// <form action="/resources/:resourceId/like" method="POST">
//   <button>LIKE</button>
// </form>



// const saveButton = document.getElementById('saveButton');
// saveButton.addEventListener('click', function(){


// })
