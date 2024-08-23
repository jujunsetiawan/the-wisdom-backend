const router = require('express').Router()
const {create, destroy, update} = require('../controllers/review')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/', authenticatedUser, authorizeRoles('admin', 'student'), create)
router.put('/:id', authenticatedUser, authorizeRoles('admin', 'student'), update)
router.delete('/:id', authenticatedUser, authorizeRoles('admin', 'student'), destroy)

module.exports = router