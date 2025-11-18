const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// CRUD routes
router.post('/register', userController.createUser)

router.get('/readuser', userController.readUserByUsername)

router.get('/readallusers', userController.readAllUsers)

router.put('/update/:id', userController.updateUser)

router.delete('/delete/:id', userController.deleteUser)

// login, logout routes
router.post('/login', userController.loginUser)


module.exports = router;