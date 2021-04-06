const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const isAuth = require('../middleware/isAuth.js');

router.post('/login', userController.login)
router.post('/register', userController.register);
router.get('/:id', isAuth, userController.getUser);
// router.put('/:id', userController.putUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;