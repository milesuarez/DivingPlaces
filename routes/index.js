const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/myDives', ensureLoggedIn("/"),(req, res, next) => {
  res.render('myDives');
});

module.exports = router;
