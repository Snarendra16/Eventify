// backend/generateSignature.js
const crypto = require('crypto');
const express = require('express');
const app = express();

const SDK_KEY = 'YOUR_SDK_KEY';
const SDK_SECRET = 'YOUR_SDK_SECRET';

app.get('/signature', (req, res) => {
  const { meetingNumber, role } = req.query;
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(SDK_KEY + meetingNumber + timestamp + role).toString('base64');
  const hash = crypto.createHmac('sha256', SDK_SECRET).update(msg).digest('base64');
  const signature = Buffer.from(`${SDK_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

  res.json({ signature });
});

app.listen(4000, () => console.log('Signature server running on port 4000'));
