# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Authentication Example

The project now includes a simple authentication flow backed by a minimal Express server. This is meant as a starting point; replace it with your own backend or a third-party provider as needed.

### Backend

A toy server lives at `server/index.js`. It keeps users in memory and issues [jwt](https://www.npmjs.com/package/jsonwebtoken) tokens. To start it:

```bash
npm install          # install both frontend and server deps
node server/index.js # listen on port 4000
```

> by default the frontend proxy defined in `vite.config.js` will forward `/api` requests to `http://localhost:4000`, so calls from the app to `/api/auth/login` and `/api/auth/register` reach the Express server.

### Frontend

- `AuthContext` (in `src/contexts/AuthContext.jsx`) exposes helpers: `login`, `register`, `logout`, `user`, and `authFetch`.
- Login and registration pages are under `src/pages/auth`.
- `ProtectedRoute` guards routes that need an authenticated user.

Feel free to read through the context and the sample server to understand how tokens are stored in `localStorage` and automatically attached to authorized fetch requests.
