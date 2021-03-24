const express = require('express');
const isAuth = require('../middleware/isAuth');
const exampleController = require('../controllers/ExampleController')
const router = express.Router();

// GET example
router.get('/example', isAuth, exampleController.getExamples);

module.exports = router;
