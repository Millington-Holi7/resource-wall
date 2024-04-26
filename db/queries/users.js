const db = require('../connection');

//USERS CRUD QUERIES

//CREATE
const createUser = (body) => {
  const {email, password} = body;
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

//READ ONE

//UPDATE

//DELETE


module.exports = { getUsers, createUser };
