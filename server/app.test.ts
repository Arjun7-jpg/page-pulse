import { describe, expect, it, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';
import axios from 'axios';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('POST /api/audit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns parsed metadata for a valid HTML page', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: '<html><head><title>Test Page</title><meta name="description" content="A test page" /></head><body><h1>Hello</h1><img /><p>Some content here</p></body></html>',
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });

    const app = createApp();
    const response = await request(app).post('/api/audit').send({ url: 'https://example.com' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Test Page');
    expect(response.body.data.metaDescription).toBe('A test page');
    expect(response.body.data.imageCount).toBe(1);
    expect(response.body.data.wordCount).toBeGreaterThan(0);
  });

  it('rejects invalid URLs', async () => {
    const app = createApp();
    const response = await request(app).post('/api/audit').send({ url: 'not-a-url' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('handles non-HTML responses', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: 'plain text',
      headers: { 'content-type': 'text/plain' },
    });

    const app = createApp();
    const response = await request(app).post('/api/audit').send({ url: 'https://example.com' });

    expect(response.status).toBe(422);
    expect(response.body.success).toBe(false);
  });

  it('handles timeout errors', async () => {
    mockedAxios.get.mockRejectedValueOnce({ code: 'ETIMEDOUT' });

    const app = createApp();
    const response = await request(app).post('/api/audit').send({ url: 'https://example.com' });

    expect(response.status).toBe(504);
    expect(response.body.success).toBe(false);
  });
});
