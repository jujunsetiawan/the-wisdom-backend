const router = require('express').Router();
const { image, index, destroy } = require('../controllers/media');
const upload = require('../middleware/multer')

router.get('/', index)
router.delete('/:id', destroy)
router.post('/image', upload.single('image'), image);

module.exports = router;
