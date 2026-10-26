# Student Registration

Simple Vue 3 + Express + MySQL project. Save a student ID and name and display registered students. Duplicate IDs show a helpful message.

## Setup

1. Install Node.js and MySQL and start MySQL.
2. Run schema.sql in MySQL Workbench.
3. Run `npm install` in this project folder.
4. Copy `.env.example` to `.env` and enter your MySQL credentials.
5. Run `npm start`.
6. Open http://localhost:3000.

The Vue CDN needs internet access. Open the server address, not the HTML file directly.

## Files

- server.js: backend API and database connection
- public/index.html: Vue form, student table, and CSS
- schema.sql: database setup
- .env.example: example settings

Real credentials belong in .env, which is excluded from Git along with node_modules.

## Verification

Run `npm run check` for server syntax. With MySQL running, save a student, refresh to verify persistence, and try the same ID again to verify the duplicate message.

This is a local learning project without authentication.
