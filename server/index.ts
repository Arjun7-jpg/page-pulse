import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import auditRouter from './routes/audit.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = Number(process.env.PORT) || 3001;
const configuredOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...configuredOrigins, 'http://localhost:3000', 'http://127.0.0.1:3000'])];

app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else if (configuredOrigins.length > 0) {
    res.header('Access-Control-Allow-Origin', configuredOrigins[0]);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use('/api', auditRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Page Pulse backend listening on port ${port}`);
});
