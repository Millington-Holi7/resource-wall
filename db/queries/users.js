const db = require('../connection');

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

///Add a new user to the database.
const addUser = function (user) {
  const { name, email, password, profile_pic_url } = user;
  return pool.query(
    `INSERT INTO users (name, email, password, profile_pic_url)
   VALUES ($1, $2, $3, $4)
   RETURNING *;`,
    [name, email, password, profile_pic_url]
  )
    .then((result) => {
      return result.rows;
    })

    .catch((error) => {
      console.error(error)
    })

};

///Posts

// Get all posts for the main page
const getAllPosts = function () {
  return pool.query(
    `SELECT title, content_link_url, description, date_posted, comments, likes
  FROM posts
  JOIN
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
 * @returns
 */
const getAllLikePosts = function () {
  return pool.query(
    `SELECT title, content_link_url, description, date_posted, comments, likes
    FROM posts
    JOIN post_likes ON post_id = posts.id
    JOIN post_comments ON  `
  )
}

module.exports = { getUsers };
