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

router.post('/:username/hangout', (req, res) => {
  try {
    const requester = req.params.username;
    const targetUser = req.body.targetUser;
    UserService.createHangout(requester, targetUser);
    res.status(200).json({message: "Hangout session created"});

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.put('/:username/rescind', (req, res) => {
  try {
    const requester = req.params.username;
    const targetUser = req.body.targetUser;

    UserService.deleteOutgoing(requester, targetUser);

    res.status(200).json({message: "Hangout request deleted"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.put('/:username/rejectincoming', (req, res) => {
  try {
    const requester = req.params.username;
    const targetUser = req.body.targetUser;

    UserService.rejectIncoming(requester, targetUser);

    res.status(200).json({message: "Incoming hangout request rejected"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.put('/:username/acceptincoming', (req, res) => {
  try {
    const requester = req.params.username;
    const targetUser = req.body.targetUser;

    UserService.acceptIncoming(requester, targetUser);

    res.status(200).json({message: "Incoming hangout request accepted"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
