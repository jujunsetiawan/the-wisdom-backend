var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: "success", 
    message: "Welcome to The Wisdom API", 
    name: "The_Wisdom_API", 
    version: "0.0.1", 
    docs_link: "https://documenter.getpostman.com/view/14970426/2sB3QFQXp2", 
    health_check: 100,
    is_open: true
  });
});

router.get('/_status/readyz', (req, res) => res.status(200).send('ready'));
router.get('/_status/healthz', (req, res) => res.status(200).send('ok'));

module.exports = router;
