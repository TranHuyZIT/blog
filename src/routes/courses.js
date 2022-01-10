const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');

router.post('/store', coursesController.store);
router.get('/create', coursesController.create);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.get('/:slug', coursesController.show);

module.exports = router;