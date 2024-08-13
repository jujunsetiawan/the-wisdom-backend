const router = require('express').Router()
const {create, update, destroy, find, index} = require('../controllers/course')
const { authenticatedUser, authorizeRoles } = require('../middleware/auth')
const paginationMiddleware = require('../middleware/paginaton')

router.post('/', authenticatedUser, authorizeRoles('admin'), create)
router.get('/', paginationMiddleware, index)
router.get('/:id', find)
router.put('/:id', authenticatedUser, authorizeRoles('admin'), update)
router.delete('/:id', authenticatedUser, authorizeRoles('admin'), destroy)

module.exports = router