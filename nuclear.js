const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>🚀 FindMyBizName WORKS!</h1><p>✅ Platform Status: ACTIVE</p><p>🌍 Serving 430.5M Entrepreneurs</p>');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', platform: 'FindMyBizName' });
});

app.listen(port, () => {
  console.log('🚀 FindMyBizName server running on port', port);
});