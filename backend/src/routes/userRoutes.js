const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const userInfo = await UserService.getUserInfo(username);
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:username/hangout', async (req, res) => {
  const requester = req.params.username;
  const targetUser = req.body.targetUser;
  
  try {
    await UserService.createHangout(requester, targetUser);
    res.status(200).json({ message: "Hangout session created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:username/rescind', async (req, res) => {
  const requester = req.params.username;
  const targetUser = req.body.targetUser;
  
  try {
    await UserService.deleteOutgoing(requester, targetUser);
    res.status(200).json({ message: "Hangout request deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:username/acceptincoming', async (req, res) => {
  const requester = req.params.username;
  const targetUser = req.body.targetUser;
  
  try {
    await UserService.acceptIncoming(requester, targetUser);
    res.status(200).json({ message: "Incoming hangout request accepted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:username/rejectincoming', async (req, res) => {
  const requester = req.params.username;
  const targetUser = req.body.targetUser;
  
  try {
    await UserService.rejectIncoming(requester, targetUser);
    res.status(200).json({ message: "Incoming hangout request rejected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:username/dip', async (req, res) => {
  const requester = req.params.username;
  const targetUser = req.body.targetUser;
  
  try {
    await UserService.hangoutNever(requester, targetUser);
    res.status(200).json({ message: "You dipped your hangout" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:username/hungout', async (req, res) => {
  const requester = req.params.username;
  const targetUser = req.body.targetUser;
  
  try {
    await UserService.hungout(requester, targetUser);
    res.status(200).json({ message: "You have both been awarded 1 point for successfully hanging out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-sms', async (req, res) => {
  try {
    const { to, body } = req.body;

    const message = await twilioClient.messages.create({
      to,
      from: twilioPhoneNumber,
      body,
    });

    console.log('SMS sent:', message.sid);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: 'Failed to send SMS' });
  }
});

module.exports = router;
