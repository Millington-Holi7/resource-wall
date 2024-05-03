router.post("/:resourceId/like", (req, res) => {
  const { resourceId } = req.params;
  const { alreadyLiked } = req.body;
  const { userId } = req.session;

  if (alreadyLiked) {
    userQueries.removeLike(userId, resourceId).then((dbRes) => {
      res.json({ status: "OK" }); //IF AJAX
      res.redirect("/resource/...") //IF FORM
    });
  } else {
    userQueries.addLike(userId, resourceId).then((dbRes) => {
      res.json({ status: "OK" });
      res.redirect("/resource/...")
    });
  }
});

router.post("/:resourceId/comment", (req, res) => {
  const { resourceId } = req.params;
  const { comment } = req.body;
  const { userId } = req.session;

//add comment
userQueries.addComment(userId, resourceId, comment)
.then ((comment))
// get all comments for a specific resourceId
userQueries.getComment()
.then((comment) => {
res.render('resource', comment)
})
.catch((error) => {
  console.error(error);
});
});



module.exports = router;


// IN THE PAGE

<button>LIKE / UNLIKE </button>

$("button.like").click(() => {
  $.ajax({
    url:"/resources/:resourceId/like",
    method:"POST",
    data:{alreadyLiked:true}
  })
})

//

// <form action="/resources/:resourceId/like" method="POST">
//   <button>LIKE</button>
// </form>



// const saveButton = document.getElementById('saveButton');
// saveButton.addEventListener('click', function(){

// })
