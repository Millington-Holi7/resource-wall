const db = require('../connection');

//USERS CRUD QUERIES

//CREATE
const createUser = (body) => {
  const { email, password } = body;
  return db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;', [email, password])
    .then(data => {
      return data.rows[0];
    });
};

//READ ALL
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


/// Users
/// Get a single user from the database given their email.

const getUserWithEmail = function (email) {

  return pool.query(
    `SELECT *
    FROM users
    WHERE email = $1`, [email]
  )
    .then((result) => {
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

///Get a single user from the database given their id.
const getUserWithId = function (id) {
  return pool.query(
    `SELECT *
    FROM users
    WHERE id = $1; `, [id]
  )
    .then((result) => {
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null
      }
    })
    .catch((error) => {
      console.error(error)
    })
};

///Add a new user to the database. REgister page
const addUser = function (user) {
  const { name, email, password, profile_pic_url } = user;
  return pool.query(
    `INSERT INTO users (username, email, password, profile_pic_url)
   VALUES ($1, $2, $3, $4)
   RETURNING *;`,
    [username, email, password, profile_pic_url]
  )
    .then((result) => {
      return result.rows;
    })

    .catch((error) => {
      console.error(error)
    })

};

// Update user
const updateUser = function (option){
  `UPDATE users`
}
///Posts
//Add post
const AddNewResource = function ();

// Get all posts for the main page
const getAllPosts = function () {
  return pool.query(
    `SELECT posts.id title, content_link_url, description, date_posted, comments
  FROM posts
  RIGHT JOIN post_likes ON posts.id = post_id
  LEFT JOIN post_comments ON posts.id = post_comments.post_id
  ORDER BY date_posted;`,
    []
  )
    .then((result) => {
      return result.rows;
    })

    .catch((error) => {
      console.error(error)
    })
}

//Get all liked posts
/**
 *post_likes table get all liked posts
 all the post info that match the post_id in post_likes
 *
 */
const getAllLikePosts = function () {
  return pool.query(
  `SELECT posts.id, title, content_link_url, description, date_posted, comments
  FROM posts
  RIGHT JOIN post_likes ON posts.id = post_id
  LEFT JOIN post_comments ON posts.id = post_comments.post_id
  ORDER BY date_posted
;`

  )
}

// get all posts that have the same topic, search bar
//they can look for topic or title, url
const getPosts = function (topic){
let queryString =
    `SELECT *
    FROM POST `




}

// Update user info based on input into the profile page

const updateUser = function (options) {

}

module.exports = {
  getUsers,
  addUser,
  getUserWithEmail,
  getUserWithId,
  getAllLikePosts,
  getAllPosts
};
