# Collection Management System (Angular + Netlify)

Production-ready Angular standalone app with mock auth, dashboard, and collection CRUD.

## Tech stack
- Angular standalone components + Angular routing
- Reactive forms and route guards
- TypeScript strict mode
- Local storage persistence for login state and collection records

## Folder structure
```text
src/
  app/
    core/
      guards/
      models/
      services/
    layout/
      navbar/
    pages/
      login/
      dashboard/
      collections/
    shared/
      summary-card/
      empty-state/
      loading-spinner/
  environments/
  main.ts
  styles.scss
public/
  _redirects
netlify.toml
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm start
   ```
3. Build production bundle:
   ```bash
   npm run build
   ```

## Netlify deployment
- **Build command:** `npm run build`
- **Publish directory:** `dist/collection-management-system/browser`

The app includes both Netlify SPA fallback options:
- `netlify.toml` redirects all routes to `/index.html`.
- `public/_redirects` ensures route refresh works for client-side routing.

## Environment configuration
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

Replace `apiUrl` values when backend integration is available.

## Backend integration path
1. Replace mock auth logic in `AuthService` with HTTP calls using Angular `HttpClient`.
2. Replace local-storage CRUD in `CollectionService` with API methods (`GET`, `POST`, `PUT`, `DELETE`).
3. Move request/response types into `core/models` and map API DTOs to UI models.
4. Add token handling (interceptor + refresh flow) for secure production auth.
