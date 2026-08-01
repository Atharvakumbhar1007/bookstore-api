# 📚 Bookstore API

A RESTful backend API for managing a bookstore — built with **Node.js**, **Express 5**, **TypeScript**, and **Prisma ORM**. Includes JWT-based authentication, role-based access control, request validation with Zod, and a clean layered architecture (routes → controllers → services).

## ✨ Features

- 🔐 **Authentication** — user registration & login with JWT-based sessions
- 🛡️ **Role-based access control** — middleware-enforced permissions for protected routes
- 📖 **Book management** — full CRUD for books
- 🏷️ **Category management** — full CRUD for categories
- 👤 **User management** — user-related endpoints
- ✅ **Request validation** — schema validation via Zod on all inputs
- 🔒 **Password security** — hashing with bcrypt
- ⚠️ **Centralized error handling** — consistent API error responses
- 🗄️ **Prisma ORM** — type-safe database access with easy migrations

## 🛠️ Tech Stack

| Layer          | Technology              |
|----------------|--------------------------|
| Runtime        | Node.js                 |
| Language       | TypeScript               |
| Framework      | Express 5                |
| ORM            | Prisma                   |
| Auth           | JSON Web Tokens (JWT)    |
| Validation     | Zod                      |
| Password Hash  | bcrypt                   |
| Dev Tooling    | ts-node, nodemon         |

## 📁 Project Structure

```
src/
├── config/          # Prisma client setup
├── controllers/      # Request handlers
├── middleware/        # Auth, role, and error-handling middleware
├── routes/            # Express route definitions
├── services/          # Business logic / DB operations
├── types/             # Shared TypeScript types
├── utils/              # Helpers (JWT, hashing, async wrapper, custom errors)
├── validators/         # Zod validation schemas
├── app.ts             # Express app setup
└── server.ts           # Entry point

prisma/
└── schema.prisma       # Database schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/Atharvakumbhar1007/bookstore-api.git
cd bookstore-api
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-jwt-secret"
PORT=3000
```

### Database Setup

```bash
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
```

### Running the App

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

### Other Useful Scripts

```bash
npm run prisma:studio     # Open Prisma Studio (visual DB browser)
```

## 📡 API Endpoints

| Method | Route                | Description                  | Auth Required |
|--------|-----------------------|-------------------------------|----------------|
| POST   | `/api/auth/register`  | Register a new user          | ❌             |
| POST   | `/api/auth/login`     | Log in and receive a JWT     | ❌             |
| GET    | `/api/books`           | List all books                | ❌             |
| POST   | `/api/books`           | Create a new book             | ✅             |
| PUT    | `/api/books/:id`       | Update a book                 | ✅             |
| DELETE | `/api/books/:id`       | Delete a book                 | ✅             |
| GET    | `/api/categories`      | List all categories           | ❌             |
| POST   | `/api/categories`      | Create a category             | ✅             |
| GET    | `/api/users`            | List/manage users             | ✅ (admin)     |

> Exact paths/params may vary — check `src/routes/` for the source of truth.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## 📄 License

This project is available under the [MIT License](LICENSE).

## 👤 Author

**Atharva Kumbhar**
[GitHub](https://github.com/Atharvakumbhar1007)
