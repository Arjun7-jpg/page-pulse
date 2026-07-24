import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import auditRouter from './routes/audit.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = Number(process.env.PORT) || 3001;
const localOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
];

const corsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin) {
      return callback(null, true);
    }

    if (
      localOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Origin not allowed: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
};

app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(cors(corsOptions));

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
