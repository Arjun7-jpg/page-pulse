import { Router, type Request, type Response, type NextFunction } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { AppError } from '../middleware/errorHandler.js';
import { validateAuditRequest } from '../middleware/validation.js';

const router = Router();

const blockedPatterns = [
  /please enable javascript/i,
  /enable javascript/i,
  /captcha/i,
  /access denied/i,
  /request blocked/i,
  /just a moment/i,
  /attention required/i,
  /verify you are human/i,
  /check the box/i,
  /cloudflare/i,
  /cf-browser-verification/i,
  /jschl_vc/i,
  /challenge-form/i,
  /please turn javascript on/i,
  /this website is operating under/i,
  /debug/i,
];

const blockedMessage = 'This website prevents automated analysis. Please try another public website.';

const detectBlockedContent = ($: cheerio.CheerioAPI, html: string): boolean => {
  const title = $('title').first().text().trim();
  const bodyText = $('body')
    .text()
    .replace(/\s+/g, ' ')
    .trim();
  const normalizedContent = `${title} ${bodyText} ${html}`.toLowerCase();

  if (blockedPatterns.some((pattern) => pattern.test(normalizedContent))) {
    return true;
  }

  const hasChallengeForm = $('form#challenge-form, form[action*="/cdn-cgi/l/chk_jschl"]').length > 0;
  const hasCloudflareProtection = /d?dos protection by cloudflare/i.test(html);

  return hasChallengeForm || hasCloudflareProtection;
};

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
    if (detectBlockedContent($, response.data)) {
      throw new AppError(422, blockedMessage);
    }

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
