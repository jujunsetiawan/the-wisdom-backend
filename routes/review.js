const router = require('express').Router()
const {create, destroy, update} = require('../controllers/review')

router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router