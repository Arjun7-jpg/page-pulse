import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const successResponse = {
  success: true,
  data: {
    url: 'https://example.com',
    title: 'Test Page Result',
    metaDescription: 'Example description',
    visibleText: 'Example content',
    wordCount: 2,
    imageCount: 0,
    responseTime: 120,
  },
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(successResponse),
    }),
  ) as unknown as typeof fetch);
});

describe('App', () => {
  it('renders the hero and form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Transform any page into a high-impact audit snapshot/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run audit/i })).toBeInTheDocument();
  });

  it('submits the form and displays results', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/url/i), 'https://example.com');
    await user.click(screen.getByRole('button', { name: /run audit/i }));

    expect(await screen.findByText(/Test Page Result/i)).toBeInTheDocument();
    expect(screen.getByText(/Example description/i)).toBeInTheDocument();
  });

  it('shows only the error message when the API returns a failure', async () => {
    const errorResponse = {
      success: false,
      message: 'This website prevents automated analysis. Please try another public website.',
    };
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(errorResponse) })));

    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/url/i), 'https://www.friv.com');
    await user.click(screen.getByRole('button', { name: /run audit/i }));

    expect(await screen.findByText(/This website prevents automated analysis\. Please try another public website\./i)).toBeInTheDocument();
    expect(screen.queryByText(/Your audit summary/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy json/i })).not.toBeInTheDocument();
  });
});
