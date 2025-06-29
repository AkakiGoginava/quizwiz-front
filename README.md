# QuizWiz Front-End

A modern React + Vite application for the QuizWiz platform.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Environment Variables](#environment-variables)
  - [Production Build](#production-build)
- [Deployment (Nginx Example)](#deployment-nginx-example)
- [Custom Error Pages](#custom-error-pages)
- [Contributing](#contributing)
- [License](#license)

## Features

- React 18 with Vite for fast development
- Tailwind CSS for styling
- React Router for SPA navigation
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

- The app will run at http://app.local.test:5173 (see `vite.config.js`)
- API requests use the URL in `.env` (`VITE_API_URL`)

### Environment Variables

- `.env` — for development
- `.env.production` — for production

Example:

```
VITE_API_URL=http://api.local.test:8000
```

### Production Build

```bash
npm run build
```

- Output is in the `dist/` folder

## Deployment

Build the app: `npm run build`

## Backend

- **Backend repository:** [quizwiz-back-end](https://github.com/RedberryInternship/quizwiz-back-akaki-goginava)
- **API URL:** https://back-quizwiz.akaki-goginava.redberryinternship.ge
