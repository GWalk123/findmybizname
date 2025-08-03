import express from "express";

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

// Simple test route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FindMyBizName - LIVE</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 50px; 
          background: linear-gradient(135deg, #0040FF, #FF2D2D);
          color: white; 
          min-height: 100vh;
          margin: 0;
        }
        h1 { color: #FFDD00; font-size: 3em; margin-bottom: 20px; }
        .status { font-size: 1.5em; margin: 20px 0; }
        .success { color: #00FF00; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>🚀 FindMyBizName WORKS!</h1>
      <div class="status success">✅ Platform Status: ACTIVE</div>
      <div class="status">🌍 Global Accessibility: ENABLED</div>
      <div class="status">⚡ Serving 430.5M Underbanked Entrepreneurs</div>
      <div class="status">🎯 Ready for PRICEGATE Evolution Campaign</div>
      <p>Your complete business operating system is now LIVE on Railway!</p>
    </body>
    </html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).send('Server Error');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 FindMyBizName server running on port ${port}`);
  console.log(`🌍 Available at: https://findmybizname-production.up.railway.app`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});