const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/delete-all', courseController.deleteAll);
router.get('/edit/:id', courseController.edit);
router.put('/update/:id', courseController.update);
router.patch('/restore/:id', courseController.restore);
router.delete('/destroy/:id', courseController.destroy);
router.delete('/force/:id', courseController.forceDelete);
router.get('/trash', courseController.trash);
router.get('/:slug', courseController.show);

module.exports = router;
