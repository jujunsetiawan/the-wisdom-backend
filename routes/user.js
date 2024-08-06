const router = require('express').Router()
const { signup, signin, profile, editprofile, find, index } = require('../controllers/user')
const { authenticatedUser } = require('../middleware/auth')

router.get('/', index)
router.get('/:id', find)
router.post('/register', signup)
router.post('/login', signin)
router.get('/profile', authenticatedUser, profile)
router.put('/profile', authenticatedUser, editprofile)

module.exports = router