const router = require('express').Router()
const {create, destroy} = require('../controllers/imageCourse')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/', authenticatedUser, authorizeRoles('admin'), create)
router.delete('/:id', authenticatedUser, authorizeRoles('admin'), destroy)

module.exports = router