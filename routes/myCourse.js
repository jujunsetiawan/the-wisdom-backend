const router = require('express').Router()
const {create, index} = require('../controllers/myCourse')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/', authenticatedUser, authorizeRoles('admin'), create)
router.get('/', authenticatedUser, authorizeRoles('admin', 'student'), index)

module.exports = router