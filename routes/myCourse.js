const router = require('express').Router()
const {create, index} = require('../controllers/myCourse')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/', authenticatedUser, authorizeRoles('admin'), create)
router.get('/', index)

module.exports = router