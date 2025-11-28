# Sascha Frontend

This repository contains the frontend application for the Sascha portfolio website. It is built using Angular and provides a responsive, single-page application to showcase personal information, skills, education, experience, and projects.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Building and Deployment](#building-and-deployment)
- [Configuration](#configuration)
- [Data](#data)
- [License](#license)

## Project Overview

The Sascha Frontend is an Angular-based web application designed to present a personal portfolio. It includes sections for personal info, skills, education, experience, and projects. The app is styled with CSS and uses JSON data files to populate the content dynamically.

## Features

- Responsive navigation bar
- Dynamic content loading from JSON data files
- Modular Angular components
- TypeScript interfaces for strong typing
- Environment-based configuration
- Unit testing with Karma and Jasmine

## Project Structure

```
/src
  /app
    app.ts               # Main Angular app bootstrap
    app.routes.ts        # Application routing configuration
    app.config.ts        # App configuration
    /navbar              # Navbar component (HTML, CSS, TS, tests)
    /types               # TypeScript interfaces and types
  /environments          # Environment configuration files
  index.html             # Main HTML entry point
  main.ts                # Angular bootstrap file
  styles.css             # Global styles
/public
  /data                  # JSON data files for content (education, experience, etc.)
  /pictures              # Images and icons
/conf
  nginx.conf             # Nginx configuration for deployment
Containerfile            # Container build file
Jenkinsfile              # CI/CD pipeline configuration
package.json             # Node dependencies and scripts
karma.conf.js            # Test runner configuration
tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (version compatible with Angular project)
- npm (Node package manager)
- Angular CLI (optional, for development convenience)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd sascha_frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Development

To run the application locally with live reload:

```
npm start
```

or if using Angular CLI:

```
ng serve
```

The app will be available at `http://localhost:4200`.

## Testing

Unit tests are configured with Karma and Jasmine. To run tests:

```
npm test
```

## Building and Deployment

To build the project for production:

```
npm run build
```

The output will be in the `dist/` directory. Use the provided `nginx.conf` and `Containerfile` for containerized deployment.

### Building Docker/Podman Image

You can also build a container image using Docker or Podman with the provided `Containerfile`:

```bash
# Build the image for testing
podman image build --build-arg ENVIRONMENT=testing -t registry.zehringer.me/sascha_frontend:testing -f container/Containerfile .

# Build the image for staging
podman image build --build-arg ENVIRONMENT=staging -t registry.zehringer.me/sascha_frontend:staging -f container/Containerfile .

# Build the image for production
podman image build --build-arg ENVIRONMENT=production -t registry.zehringer.me/sascha_frontend:production -f container/Containerfile .
# or also production
podman image build --build-arg ENVIRONMENT=production -t registry.zehringer.me/sascha_frontend:latest -f container/Containerfile .

# Run the container
podman run -d -p 80:80 localhost/sascha_frontend:testing
podman run -d -p 80:80 registry.zehringer.me/sascha_frontend:staging
podman run -d -p 80:80 registry.zehringer.me/sascha_frontend:production
podman run -d -p 80:80 registry.zehringer.me/sascha_frontend:latest
```

This will serve the application on port 80.
## Configuration

Environment-specific settings are located in the `src/environments/` folder:

- `environment.ts` for development
- `environment.testing.ts` for testing
- `environment.staging.ts` for demo
- `environment.prod.ts` for production

## Data

Content is loaded from JSON files located in `public/data/`:

- `education.json`
- `experience.json`
- `personal-info.json`
- `projects.json`
- `skills.json`

These files can be edited to update the portfolio content without changing the code.

## License

This project is licensed under the MIT License.
