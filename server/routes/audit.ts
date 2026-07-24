import { Router, type Request, type Response, type NextFunction } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { AppError } from '../middleware/errorHandler.js';
import { validateAuditRequest } from '../middleware/validation.js';

const router = Router();

router.post('/audit', validateAuditRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body as { url: string };
    const startedAt = Date.now();

    const response = await axios.get<string>(url, {
      responseType: 'text',
      timeout: 10000,
      headers: {
        'User-Agent': 'PagePulseBot/1.0',
      },
    });

    const contentType = String(response.headers['content-type'] ?? '');
    if (!contentType.toLowerCase().includes('text/html')) {
      throw new AppError(422, 'The target URL did not return HTML content.');
    }

    const $ = cheerio.load(response.data);
    const title = $('title').first().text().trim() || null;
    const metaDescription = $('meta[name="description"]').attr('content')?.trim() || null;
    const visibleText = $('body')
      .text()
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = visibleText ? visibleText.split(/\s+/).length : 0;
    const imageCount = $('img').length;
    const responseTime = Date.now() - startedAt;

    res.status(200).json({
      success: true,
      data: {
        url,
        title,
        metaDescription,
        visibleText,
        wordCount,
        imageCount,
        responseTime,
      },
    });
  } catch (error) {
    const maybeAxiosError = error as { code?: string; response?: { status?: number } };

    if (axios.isAxiosError(error) || maybeAxiosError?.code) {
      if (maybeAxiosError.code === 'ECONNABORTED' || maybeAxiosError.code === 'ETIMEDOUT') {
        next(new AppError(504, 'The request timed out.', { code: maybeAxiosError.code }));
        return;
      }

      if (maybeAxiosError.response) {
        next(new AppError(maybeAxiosError.response.status ?? 502, 'The target URL returned an error response.', { status: maybeAxiosError.response.status }));
        return;
      }

      next(new AppError(502, 'Network error while fetching the URL.', { code: maybeAxiosError.code }));
      return;
    }

    next(error);
  }
});

export default router;
