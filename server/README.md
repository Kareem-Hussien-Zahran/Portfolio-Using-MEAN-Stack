# Portfolio API (Express 5 + Mongoose)

```bash
npm install
# edit .env  (see the Atlas setup below)
npm run seed     # fills an EMPTY database with the starter projects, skills, experience, profile
npm run dev      # http://localhost:3000   (npm start = same without --watch)
```

## MongoDB Atlas setup
1. Atlas → **Database Access** → create a database user (username + password).
2. Atlas → **Network Access** → add your current IP address (`0.0.0.0/0` allows any IP – testing only).
3. Atlas → your cluster → **Connect → Drivers** → copy the `mongodb+srv://…` string.
4. Paste it into `.env` as `MONGODB_URI`, replacing `<db_user>`, `<db_password>` and adding the database name `portfolio`
   before the `?`. Special characters in the password must be URL-encoded (`@` → `%40`, `#` → `%23`).

```
PORT=3000
MONGODB_URI=mongodb+srv://myuser:myPass@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority
ADMIN_PASSWORD=admin123                     # dashboard login – CHANGE before deploying
AUTH_SECRET=change-this-long-random-secret  # signs admin tokens – CHANGE before deploying
# DNS_SERVERS=208.67.222.222,1.1.1.1        # optional override (see below)
```

`src/config/db.js` points Node's DNS at `208.67.222.222` and `1.1.1.1` before connecting. This fixes the common
`querySrv ECONNREFUSED` error that `mongodb+srv://` URIs hit on some networks/ISPs. A local `mongodb://127.0.0.1:27017/portfolio`
URI works too. Never commit `.env` (it holds your database password).

**Seeding is safe by default:** `npm run seed` refuses to run when the database already has data, because the dashboard
edits live data. Use `npm run seed -- --force` only when you really want to wipe and reset everything.

## Endpoints
Public: `GET /api/profile`, `GET /api/projects[?category=&featured=true]`, `GET /api/projects/:id`,
`GET /api/skills`, `GET /api/experience`, `POST /api/contact`.

Admin (header `Authorization: Bearer <token>` from `POST /api/auth/login {password}`):
`PUT /api/profile`, `POST|PUT|DELETE /api/projects[/:id]`, `POST|PUT|DELETE /api/skills[/:id]`,
`POST|PUT|DELETE /api/experience[/:id]`, `GET /api/contact`, `PATCH|DELETE /api/contact/:id`, `GET /api/auth/me`.

Errors are JSON `{ message }`: 400 invalid data / invalid id, 401 unauthorized, 404 not found,
409 duplicate project id, 429 too many login attempts.
