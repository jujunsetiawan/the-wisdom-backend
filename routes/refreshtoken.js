const router = require('express').Router()
const {find} = require('../controllers/refreshtoken')

router.get('/:refreshtoken/:email', find)

module.exports = router