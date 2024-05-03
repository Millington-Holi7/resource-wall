const db = require("../connection");

//USERS CRUD QUERIES

//CREATE
///Add a new user to the database.
const addUser = function (user) {
  const { username, email, password } = user;
  return db
    .query(
      `INSERT INTO users (username, email, password)
   VALUES ($1, $2, $3)
   RETURNING *;`,
      [username, email, password]
    )
    .then((result) => {
      // console.log(result.rows[0]);
      return result.rows[0];
    })

    .catch((error) => {
      console.error(error);
    });
};

const addPost = function (post) {
  const { user_id, topic_id, title, content_link_url, description } = post;
  return db
    .query(
      `INSERT INTO posts (user_id, topic_id, title, content_link_url, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
      [user_id, topic_id, title, content_link_url, description]
    )
    .then((result) => {
      console.log(result.rows)
      return result.rows;
    })

    .catch((error) => {
      console.error(error);
    });
};

const addLike = function (like) {
  const { user_id, post_id } = like;
  return db
    .query(
      `INSERT INTO post_likes (user_id, post_id)
  VALUES ($1, $2)
  RETURNING *;`,
      [user_id, post_id]
    )
    .then((result) => {
      return result.rows;
    })

    .catch((error) => {
      console.error(error);
    });
};

const addComment = function (comment) {};

const addRaiting = function (raiting) {};

//READ ALL
const getUsers = () => {
  return db.query(`SELECT * FROM users;`).then((data) => {
    return data.rows;
  });
};

///Posts
// Get all posts for the main page
const getAllPosts = function () {
  return db
    .query(
      `SELECT 
      posts.*, COUNT(post_likes.*) AS likes, JSON_AGG(post_comments) AS comments
    FROM 
      posts
    LEFT JOIN 
      post_likes ON posts.id = post_likes.post_id
    LEFT JOIN
      post_comments ON posts.id = post_comments.post_id
    GROUP BY
      posts.id;
      `,
      []
    )
    .then((result) => {
      console.log(result.rows[0])
      return result.rows;
    })

    .catch((error) => {
      console.error(error);
    });
};

//Get all liked posts
/**
 *post_likes table get all liked posts
 all the post info that match the post_id in post_likes
 *
 */
const getAllLikePosts = function () {
  return db.query(
    `SELECT title, content_link_url, description, date_posted, comments, likes
    FROM posts
    JOIN post_likes ON post_id = posts.id
    JOIN post_comments ON  `
  );
};

//READ ONE
/// Users
// Get a single user from the database given their username
const getUserWithUsername = function(username) {
  return db.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  )
  .then((result) => {
    if (result.rows.length) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

/// Get a single user from the database given their email.
const getUserWithEmail = function (email) {
  return db
    .query(
      `SELECT *
    FROM users
    WHERE email = $1`,
      [email]
    )
    .then((result) => {
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

///Get a single user from the database given their id.
const getUserWithId = function (id) {
  return db
    .query(
      `SELECT *
    FROM users
    WHERE id = $1; `,
      [id]
    )
    .then((result) => {
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Get all user posts

const getUserPosts = function() {
  return db
    .query(
      `SELECT 
      posts.*, COUNT(post_likes.*) AS likes
    FROM 
      posts
    LEFT JOIN 
      post_likes ON posts.id = post_likes.post_id
    WHERE 
      posts.user_id = 1
    GROUP BY
      posts.id;
      `
    )
    .then((result) => {
      console.log(result.rows)
      return result.rows;
    })
    .catch((error) => {
      console.error(error);
    });
}

//UPDATE





// get all posts that have the same title

const getResource = function (title) {

  return db
    .query(`
    SELECT content_link_url, title, description, name, date_posted
    FROM posts
    JOIN topics ON topics.id = topic_id
    WHERE title = $1
    `, [title]
    )
    .then((res) => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch((error) => {
      console.error(error);
    });
};


const getPostById = function(postId) {
  return db
    .query(
      `SELECT 
      posts.*, COUNT(post_likes.*) AS likes
    FROM 
      posts
    LEFT JOIN 
      post_likes ON posts.id = post_likes.post_id
    WHERE 
      posts.id = $1
    GROUP BY
      posts.id;
      `, [postId]
    )
    .then((result) => {
      console.log(result.rows[0])
      return result.rows[0];
    })
    .catch((error) => {
      console.error(error);
    });
}

// Update user info based on input into the profile page

const updateUser = function (options) {};
//DELETE

module.exports = {
  addUser,
  addPost,
  addLike,
  addComment,
  addRaiting,
  getAllLikePosts,
  getUserWithUsername,
  getUserWithEmail,
  getUserWithId,
  getUsers,
  getUserPosts,
  getAllPosts,
  getPostById,
  getResource
};
