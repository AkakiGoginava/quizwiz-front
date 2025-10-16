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
- [Deployment](#deployment-nginx-example)

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

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

### Production Build

```bash
npm run build
```

- Output is in the `dist/` folder

## Deployment

Build the app: `npm run build`

## Backend

- **Backend repository:** [quizwiz-back-end](https://github.com/AkakiGoginava/quizwiz-back.git)
