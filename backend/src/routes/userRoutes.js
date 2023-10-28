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

router.post('/username/hangout', (req, res) => {
  try {
    const requester = req.params.username;
    const targetUser = req.body.targetUser;

    const result = UserService.createHangout(requester, targetUser);

    res.status(200).json({message: "Hangout session created", data: result });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
