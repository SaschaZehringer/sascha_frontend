# System Patterns

## Architecture
- The application follows a modular Angular architecture.
- Components are organized by feature, e.g., navbar component under src/app/navbar.
- Data is separated from presentation, loaded from JSON files in src/assets/data.
- Routing is managed via Angular's router module (app-routing.module.ts).

## Design Patterns
- Component-based UI design for reusability and separation of concerns.
- Use of services (if any) for data handling and business logic (to be confirmed).
- Data-driven rendering using Angular's template binding and directives.
- CSS styling scoped to components for modularity and maintainability.

## Component Relationships
- AppComponent serves as the root component.
- NavbarComponent provides navigation and is included in AppComponent.
- Other components likely exist for sections such as education, experience, projects, skills (to be confirmed).

## Build and Test Patterns
- Angular CLI used for building and serving the app.
- Karma and Jasmine configured for unit testing (karma.conf.js present).
- ESLint configured for linting (eslint.config.js present).

This document captures the key architectural and design patterns guiding the project.
