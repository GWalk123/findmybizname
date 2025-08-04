const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Production-ready static file serving
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

// API routes for production
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    platform: 'FindMyBizName',
    version: 'Production',
    features: [
      'AI Business Name Generation',
      'Domain Checking',
      'CRM System', 
      'Payment Processing',
      'Global Entrepreneur Platform'
    ]
  });
});

// Serve the complete React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 FindMyBizName Production Server running on port ${port}`);
  console.log('🌍 Serving complete business operating system');
  console.log('⚡ All features active and ready for 430.5M entrepreneurs');
});