const router = require('express').Router()
const {create, update, index, find, destroy} = require('../controllers/mentor')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/', authenticatedUser, authorizeRoles('admin'), create)
router.get('/', authenticatedUser, authorizeRoles('admin'), index)
router.get('/:id', authenticatedUser, authorizeRoles('admin'), find)
router.put('/:id', authenticatedUser, authorizeRoles('admin'), update)
router.delete('/:id', authenticatedUser, authorizeRoles('admin'), destroy)

module.exports = router