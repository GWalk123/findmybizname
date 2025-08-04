import express from 'express';
const app = express();

// Ultra-simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'Railway working', timestamp: new Date().toISOString() });
});

// Main route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>FindMyBizName - Railway Success</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: #1a1a1a; color: white;">
        <h1 style="color: #FF2D2D;">FindMyBizName</h1>
        <h2 style="color: #0040FF;">Global Business Operating System</h2>
        <p style="color: #10B981; font-size: 20px;">RAILWAY DEPLOYMENT: SUCCESS</p>
        <p>Serving 430.5M Underbanked Entrepreneurs Worldwide</p>
        <p>Platform Status: <strong style="color: #10B981;">LIVE</strong></p>
      </body>
    </html>
  `);
});

// Railway port binding
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`FindMyBizName running on Railway port ${port}`);
});