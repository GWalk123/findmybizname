import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.paypal.com", "https://www.sandbox.paypal.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.paypal.com", "https://api.sandbox.paypal.com"],
      frameSrc: ["'self'", "https://www.paypal.com", "https://www.sandbox.paypal.com"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: "High traffic detected. Please wait a moment and try again." }
});

app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Simple test route
app.get('/test', (req, res) => {
  res.send('FindMyBizName Server is working!');
});

// Basic HTML response for root
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FindMyBizName - Live</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0040FF; color: white; }
        h1 { color: #FFDD00; }
      </style>
    </head>
    <body>
      <h1>FindMyBizName Works!</h1>
      <p>Your complete business operating system for underbanked entrepreneurs is now LIVE!</p>
      <p>Platform Status: ACTIVE</p>
      <p>Global Accessibility: ENABLED</p>
    </body>
    </html>
  `);
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: `Server Error: ${err.message}` });
});

(async () => {
  try {
    const server = await registerRoutes(app);
    
    const port = parseInt(process.env.PORT || '5000', 10);
    
    server.listen(port, '0.0.0.0', () => {
      console.log(`🚀 FindMyBizName server running on port ${port}`);
      console.log(`🌍 Platform accessible at: https://findmybizname-production.up.railway.app`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();