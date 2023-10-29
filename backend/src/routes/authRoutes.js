const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService');

router.post('/register', async (req, res, next) => {
  const { username, password, first, last } = req.body;

  try {
    const registeredUser = await AuthService.register(username, password, first, last);
    res.status(201).json({ username: registeredUser });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const loggedInUser = await AuthService.login(username, password);
    res.json({ username: loggedInUser });
  } catch (error) {
    next(error);
  }
});

router.get('/curr', async (req, res, next) => {
  try {
    const loggedInUser = AuthService.currUser;
    res.json({ username: loggedInUser });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
