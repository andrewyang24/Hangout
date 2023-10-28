const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

router.get('/:username', (req, res, next) => {
  const { username } = req.params;

  try {
    const userInfo = UserService.getUserInfo(username);
    res.json(userInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
