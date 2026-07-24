import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      success: true,
      data: {
        url: 'https://example.com',
        title: 'Example Domain',
        metaDescription: 'Example description',
        visibleText: 'Example content',
        wordCount: 2,
        imageCount: 0,
        responseTime: 120,
      },
    }),
  }),
));

describe('App', () => {
  it('renders the hero and form', () => {
    render(<App />);
    expect(screen.getByText(/Turn any page into a quick audit snapshot/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run audit/i })).toBeInTheDocument();
  });

  it('submits the form and displays results', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/url/i), 'https://example.com');
    await user.click(screen.getByRole('button', { name: /run audit/i }));

    expect(await screen.findAllByText(/Example Domain/i)).toHaveLength(2);
    expect(screen.getAllByText(/Example description/i)).toHaveLength(2);
  });
});
