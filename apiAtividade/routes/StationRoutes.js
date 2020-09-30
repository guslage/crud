const express = require('express');
const router = express.Router();

const Controller = require('../controllers/StationController');

router.post('/new', Controller.post);
router.get('/index', Controller.index);
router.get('/find/:id', Controller.find);
router.put('/update/:id', Controller.update);
router.delete('/delete/:id', Controller.delete);

module.exports = router;