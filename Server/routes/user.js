const express = require('express');

const router = express.Router();
// get mentorController
const { userController } = require('../controllers');

// * POST /signin
router.post('/signin', userController.signin.post);

// * POST /signup
router.post('/signup', userController.signup.post);

// * GET /signup
router.get('/profile', userController.profile.get);

// * PATCH /signup
router.patch('/profile', userController.profile.patch);

module.exports = router;