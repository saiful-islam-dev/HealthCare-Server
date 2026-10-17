# 🏥 PH Healthcare — Backend API

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F172A,100:0D9488&height=180&section=header&text=PH%20Healthcare%20API&fontSize=40&fontColor=FFFFFF&animation=fadeIn&fontAlignY=42&desc=Secure%20%7C%20Scalable%20%7C%20Type-Safe%20Backend&descAlignY=68&descSize=16" alt="PH Healthcare Backend Banner" width="100%" />
</p>

<p align="center">
  A healthcare backend API built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.
</p>

---

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Deployment](#-deployment)
- [Contact](#-contact)

## 🚀 Introduction

**PH Healthcare Backend** is the server-side application for the PH Healthcare frontend. It provides the foundation for API endpoints, database operations, authentication, validation, and healthcare-related application workflows.

Built with Express and TypeScript, the backend uses Prisma ORM for database access and integrates tools for password hashing, token-based authentication, file uploads, and email delivery.

## ✨ Features

- 🌐 REST API development with Express.js
- 🔷 Type-safe backend development with TypeScript
- 🗄️ Database access using Prisma ORM
- 🔐 JWT-based authentication support
- 🔒 Password hashing with bcrypt
- 🍪 Cookie handling with cookie-parser
- ✅ Request validation using Zod
- 📤 File upload handling with Multer
- ☁️ Cloud media management with Cloudinary
- 📧 Email delivery using Nodemailer
- 🌍 Cross-Origin Resource Sharing (CORS) support
- 📅 Date handling with date-fns
- ⚡ Fast development workflow with ts-node-dev

*These features are based on your installed dependencies. Confirm the corresponding implementations in your source code.*

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js 4 | HTTP server and API routing |
| TypeScript 5 | Static typing |
| Prisma ORM 5 | Database access and schema management |
| PostgreSQL | Database, if configured in your Prisma datasource |
| Zod | Request and data validation |
| JSON Web Token | Token-based authentication |
| bcrypt | Password hashing |
| Multer | Multipart file uploads |
| Cloudinary | Cloud-based media storage |
| Nodemailer | Email delivery |
| dotenv | Environment variable management |
| cookie-parser | Cookie parsing |
| CORS | Cross-origin request configuration |
| date-fns | Date utilities |
| http-status | HTTP status code constants |

## 🏗️ Architecture

The backend can be organized into the following layers:

- **Routes:** Define API endpoints.
- **Controllers:** Handle HTTP requests and responses.
- **Services:** Implement application business logic.
- **Prisma:** Manage database queries and persistence.
- **Middlewares:** Handle authentication, validation, and errors.
- **Utilities:** Provide reusable helpers and shared functions.

The exact architecture depends on your existing source code.

## ⚙️ Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- [PostgreSQL](https://www.postgresql.org/), if used by your Prisma schema
- [Git](https://git-scm.com/)

### Installation

**1. Clone the backend repository**

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd healthcare-server
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the project root. For example:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/healthcare_db"
JWT_SECRET="replace_with_a_secure_random_secret"
```

Add other variables required by your implementation, such as Cloudinary credentials, email configuration, and frontend origins.

**5. Generate the Prisma Client**

```bash
npx prisma generate
```

If your database schema has not yet been applied, use the appropriate Prisma migration command for your development environment.

**6. Start the development server**

```bash
npm run dev
```

The server will start on the configured port if `src/server.ts` is set up correctly.

## 🔐 Environment Variables

Common environment variables may include:

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `DATABASE_URL` | Database connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `FRONTEND_URL` | Allowed frontend origin, if used |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_USER` | Email account or SMTP username |
| `EMAIL_PASS` | Email or SMTP credential |

Use the exact variable names expected by your source code. Never commit real credentials or `.env` files to GitHub.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with automatic restarts |
| `npm test` | Currently exits with a placeholder error because tests are not configured |

### Development

```bash
npm run dev
```

Your current development command runs:

```bash
ts-node-dev --respawn --transpile-only src/server.ts
```

For production, consider adding a TypeScript build script and a production start command.

## 📁 Project Structure

A typical Express and Prisma backend may follow this structure:

```text
healthcare-server/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── utils/
│   └── config/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

*Adjust the structure to match your actual repository.*

## 🔒 Security

- Hash passwords using bcrypt before storing them.
- Validate incoming requests with Zod.
- Protect private endpoints with authentication middleware.
- Configure CORS for trusted frontend origins.
- Store secrets in environment variables.
- Validate uploaded files and enforce size limits.
- Avoid logging sensitive healthcare or authentication data.

## ☁️ Deployment

You can deploy the backend using a Node.js-compatible hosting platform, such as:

- [Render](https://render.com/)
- [Railway](https://railway.com/)
- [AWS](https://aws.amazon.com/)

Before deployment:

1. Configure production environment variables.
2. Provision and connect the production database.
3. Generate the Prisma Client.
4. Configure database migrations.
5. Set the frontend's allowed origin.
6. Add production build and start scripts.
7. Test authentication, API endpoints, and error handling.

## 📬 Contact

**Saiful Islam** — Web Developer

- GitHub: [saiful-islam-dev](https://github.com/saiful-islam-dev)

---

<p align="center">
  ⭐ If you find this project interesting, consider giving the repository a star!
</p>

<p align="center">
  Built with ❤️ by Saiful Islam
</p>