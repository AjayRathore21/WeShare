const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
//profile page render
router.get('/profile', usersController.profile);
//signup page render
router.get('/sign-up',usersController.signUp);
//signin page render
router.get('/sign-in',usersController.signIn)

// get the  signup data
router.post('/create',usersController.create);


module.exports = router;