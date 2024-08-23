const router = require('express').Router()
const {find, webhook} = require('../controllers/order')
const {authenticatedUser, authorizeRoles} = require('../middleware/auth')

router.get('/', authenticatedUser, authorizeRoles('admin', 'student'), find)
router.post('/webhook', webhook)

module.exports = router