const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.end('hello from posts/');
});

router.get('/hi', (req, res) => {
    res.end('this is posts/hi')
});

module.exports = router;
