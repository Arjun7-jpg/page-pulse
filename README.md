# Page Pulse

## Project Overview

Page Pulse is a lightweight full-stack web app that lets a user submit a public URL and receive a quick HTML audit summary. The app uses a React + TypeScript frontend and an Express + TypeScript backend to fetch a page, parse its HTML, and return key metadata such as the page title, meta description, visible text, word count, image count, and response time.

## Features

- Responsive React + TypeScript frontend with a dark-mode toggle
- Navbar, hero section, audit form, loading state, result cards, and a Copy JSON action
- Express backend with:
  - POST /api/audit
  - URL validation
  - Axios-based fetching
  - Cheerio HTML parsing
  - Title extraction
  - Meta description extraction
  - Visible text extraction
  - Word count calculation
  - Image count calculation
  - Response time measurement
- Error handling for:
  - invalid URLs
  - timeouts
  - non-HTML responses
  - missing metadata
  - network errors
- Security and reliability middleware:
  - Helmet
  - Morgan
  - Compression
  - Rate limiting
  - Global error handling
  - Validation middleware
- Vitest + Supertest test coverage for backend and frontend behavior

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Express, TypeScript, Axios, Cheerio, express-validator
- Testing: Vitest, Supertest, Testing Library, jsdom
- Tooling: ESLint, TypeScript compiler

## Folder Structure

```text
page-pulse/
├── index.html
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.server.json
├── eslint.config.js
├── server/
│   ├── app.ts
│   ├── index.ts
│   ├── app.test.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   └── routes/
│       └── audit.ts
└── src/
    ├── App.tsx
    ├── App.test.tsx
    ├── main.tsx
    ├── styles.css
    ├── types.ts
    ├── components/
    │   ├── AuditForm.tsx
    │   ├── Loading.tsx
    │   ├── Navbar.tsx
    │   └── ResultCards.tsx
    └── test/
        └── setup.ts
```

## Architecture

The application is split into two main layers:

1. Frontend layer
   - Built with React and Vite.
   - Renders the UI and sends POST requests to the backend audit endpoint.

2. Backend layer
   - Built with Express and TypeScript.
   - Receives the URL, validates it, fetches the page with Axios, parses the HTML with Cheerio, and returns a JSON payload.

The frontend calls the backend at http://127.0.0.1:3001/api/audit while the Vite dev server runs on http://localhost:3000.

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Running Locally

Start the backend:

```bash
npm run dev:server
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000 and the backend will run on http://127.0.0.1:3001.

## Environment Variables

The current implementation uses a single runtime variable for the backend port:

- PORT: Optional. Defaults to 3001 if not set.

Example:

```bash
PORT=3001 npm run dev:server
```

## API Contract

### POST /api/audit

Request body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "title": "Example Domain",
    "metaDescription": null,
    "visibleText": "Example Domain...",
    "wordCount": 17,
    "imageCount": 0,
    "responseTime": 996
  }
}
```

Error responses return a JSON object with:

```json
{
  "success": false,
  "message": "Invalid request body"
}
```

## Sample Request

```bash
curl -X POST http://127.0.0.1:3001/api/audit \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

## Sample Response

```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "title": "Example Domain",
    "metaDescription": null,
    "visibleText": "Example DomainThis domain is for use in documentation examples without needing permission. Avoid use in operations.Learn more",
    "wordCount": 17,
    "imageCount": 0,
    "responseTime": 996
  }
}
```

## Testing

Run the full test suite:

```bash
npx vitest run
```

The repository currently includes tests for:
- backend route behavior for success, invalid URL, non-HTML, and timeout cases
- frontend rendering and form submission flow

## Deployment

The current implementation is designed for local development and can be deployed to any Node.js hosting environment that supports Express.

Recommended deployment steps:
1. Build the frontend:

```bash
npm run build
```

2. Build the server TypeScript sources:

```bash
npm run build:server
```

3. Start the backend process with the desired port and host configuration.

## Three Design Decisions with Reasoning

1. Separate frontend and backend services
   - The app uses a Vite frontend and an Express backend so the UI can remain lightweight while the HTML fetch and parsing logic remains isolated and easier to test.

2. Use Axios + Cheerio for page analysis
   - Axios handles HTTP requests reliably, and Cheerio provides a simple server-side DOM parser for extracting the needed metadata from HTML.

3. Keep the UI state simple and local
   - The app uses React state for loading, errors, and result payloads to keep the initial implementation focused and easy to reason about while still supporting the required user flow.

## Future Improvements

- Add authentication or API key protection for the audit endpoint
- Support batch audits for multiple URLs
- Add richer page metrics such as heading count, link count, and accessibility hints
- Improve error messaging for blocked or inaccessible pages
- Add a persisted history of previous audits

## Screenshots Placeholders

- Hero and audit form: ![Hero and audit form](docs/screenshots/hero-form.png)
- Results view: ![Results view](docs/screenshots/results.png)

## License

This project is available for educational and demonstration purposes.
