const router = require('express').Router()
const {create, destroy, find, index, update} = require('../controllers/chapter')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/', authenticatedUser, authorizeRoles('admin'), create)
router.get('/', index)
router.get('/:id', find)
router.put('/:id', authenticatedUser, authorizeRoles('admin'), update)
router.delete('/:id', authenticatedUser, authorizeRoles('admin'), destroy)

module.exports = router