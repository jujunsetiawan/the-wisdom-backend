const router = require('express').Router();
const { image, index, destroy } = require('../controllers/media');
const { authorizeRoles, authenticatedUser } = require('../middleware/auth');
const upload = require('../middleware/multer')

router.get('/', authenticatedUser, authorizeRoles('admin', 'student'), index)
router.delete('/:id', authenticatedUser, authorizeRoles('admin', 'student'), destroy)
router.post('/image', authenticatedUser, authorizeRoles('admin', 'student'), upload.single('image'), image);

module.exports = router;
