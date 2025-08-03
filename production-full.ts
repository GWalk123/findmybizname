import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { storage } from "./storage.js";
import { nanoid } from "nanoid";

const app = express();
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: "Rate limit exceeded" }
});

app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Health check for Railway
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    platform: 'FindMyBizName'
  });
});

// Main landing page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FindMyBizName - Complete Business Operating System</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0; padding: 0;
          background: linear-gradient(135deg, #0040FF 0%, #FF2D2D 100%);
          color: white; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          text-align: center;
        }
        .container { max-width: 800px; padding: 40px 20px; }
        h1 { font-size: 3.5em; margin-bottom: 20px; color: #FFDD00; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .tagline { font-size: 1.5em; margin-bottom: 40px; opacity: 0.9; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
        .status-card { 
          background: rgba(255,255,255,0.1); 
          padding: 20px; 
          border-radius: 10px; 
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .status-card h3 { color: #FFDD00; margin-bottom: 10px; }
        .feature-list { text-align: left; margin: 40px 0; }
        .feature-list ul { list-style: none; padding: 0; }
        .feature-list li { padding: 10px 0; font-size: 1.1em; }
        .feature-list li:before { content: "✅ "; margin-right: 10px; }
        .cta-section { margin-top: 40px; }
        .cta-button { 
          background: #FFDD00; 
          color: #0040FF; 
          padding: 15px 30px; 
          font-size: 1.2em; 
          font-weight: bold; 
          border: none; 
          border-radius: 5px; 
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          margin: 10px;
        }
        .stats { margin: 20px 0; font-size: 1.1em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 FindMyBizName</h1>
        <div class="tagline">The First Complete Global Business Operating System for Underbanked Entrepreneurs</div>
        
        <div class="status-grid">
          <div class="status-card">
            <h3>Platform Status</h3>
            <div>✅ LIVE & ACTIVE</div>
          </div>
          <div class="status-card">
            <h3>Global Reach</h3>
            <div>🌍 430.5M Entrepreneurs</div>
          </div>
          <div class="status-card">
            <h3>Market Opportunity</h3>
            <div>💰 $5.2 Trillion</div>
          </div>
          <div class="status-card">
            <h3>Campaign Ready</h3>
            <div>⚡ PRICEGATE Evolution</div>
          </div>
        </div>

        <div class="feature-list">
          <h2>Complete Business Platform Features:</h2>
          <ul>
            <li>AI-Powered Business Name Generation</li>
            <li>Real-Time Domain Availability Checking</li>
            <li>Brand Analysis & Social Media Integration</li>
            <li>SEC EDGAR Business Intelligence (500K+ Companies)</li>
            <li>Live Business News Feed (Biz Newz)</li>
            <li>AI Customer Support System (Biz Botz)</li>
            <li>Global Referral System (30% Commissions)</li>
            <li>Digital Products Marketplace</li>
            <li>Alternative Payment Solutions (WiPay, PayPal)</li>
            <li>6-Tier Subscription System ($9.99-$149)</li>
          </ul>
        </div>

        <div class="stats">
          <strong>Breaking the Business Tool Cartel:</strong><br>
          94% LESS cost than "Big 5" platforms • More features • Global accessibility
        </div>

        <div class="cta-section">
          <a href="/api/health" class="cta-button">System Health Check</a>
          <div style="margin-top: 20px; font-size: 0.9em; opacity: 0.8;">
            Referral Code: FMBN-FOUNDER-2025
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Basic API endpoints
app.get('/api/user', async (req, res) => {
  try {
    // Demo user for development
    const user = {
      id: 1,
      username: "demo_entrepreneur",
      email: "demo@findmybizname.com",
      plan: "pro",
      dailyUsage: 0,
      usageLimit: 999,
      remainingUsage: 999
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

const port = parseInt(process.env.PORT || '5000', 10);

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 FindMyBizName Production Server running on port ${port}`);
  console.log(`🌍 Platform: https://findmybizname-production.up.railway.app`);
  console.log(`📊 Serving 430.5M underbanked entrepreneurs globally`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});