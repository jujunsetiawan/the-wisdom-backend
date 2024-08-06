var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({status: "success", message: "Welcome to The Wisdom API",  name: "The_Wisdom_API", version: "0.0.1", docs_link: "", health_check: 100, is_open: true});
});

module.exports = router;
