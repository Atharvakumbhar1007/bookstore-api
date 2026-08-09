# 📚 Bookstore API

A RESTful backend API for managing a bookstore — built with **Node.js**, **Express 5**, **TypeScript**, and **Prisma ORM**. Includes JWT-based authentication, role-based access control, request validation with Zod, and a clean layered architecture (routes → controllers → services).

## ✨ Features

- 🔐 **Authentication** — user registration & login with JWT-based sessions, forgot/reset password
- 🛡️ **Role-based access control** — `USER` and `ADMIN` roles with middleware-enforced permissions
- 📖 **Book management** — full CRUD; users manage their own books, admins see all
- 🏷️ **Category management** — full CRUD for categories (admin-only write operations)
- 👤 **User management** — profile endpoint for all users, user list for admins
- ✅ **Request validation** — schema validation via Zod on all inputs
- 🔒 **Password security** — hashing with bcrypt (10 rounds)
- ⚠️ **Centralized error handling** — consistent API error responses
- 🗄️ **Prisma ORM** — type-safe SQLite database access with migrations

## 🛠️ Tech Stack

| Layer          | Technology              |
|----------------|--------------------------|
| Runtime        | Node.js (v18+)          |
| Language       | TypeScript (strict mode) |
| Framework      | Express 5                |
| ORM            | Prisma                   |
| Database       | SQLite                   |
| Auth           | JSON Web Tokens (JWT)    |
| Validation     | Zod                      |
| Password Hash  | bcrypt                   |
| Dev Tooling    | ts-node, nodemon         |

## 📁 Project Structure

```
src/
├── config/          # Prisma client setup
├── controllers/     # Request handlers (auth, book, category, user)
├── middleware/      # Auth, role, and error-handling middleware
├── routes/          # Express route definitions
├── services/        # Business logic / DB operations
├── types/           # Shared TypeScript type extensions
├── utils/           # Helpers (JWT, hashing, asyncHandler, ApiError, token)
├── validators/      # Zod validation schemas
├── app.ts           # Express app setup
└── server.ts        # Entry point

prisma/
├── schema.prisma    # Database schema (User, Book, Category)
├── migrations/      # Migration history
└── seed.ts          # Admin user + category seed
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/Atharvakumbhar1007/bookstore-api.git
cd bookstore-api
npm install
```

### Environment Variables

Copy the example file and edit as needed:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-strong-secret-key"
JWT_EXPIRES_IN="1h"
PORT=5000
```

> ⚠️ **Change `JWT_SECRET` to a long, random string before deploying.**

### Database Setup

```bash
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations (creates SQLite DB)
npm run prisma:seed       # Seed admin user + categories
```

**Seeded admin credentials:** `admin@bookstore.com` / `admin123`

**Seeded categories:** Fiction, Non-Fiction, Science, Technology, History, Biography

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

---

## 📡 API Endpoints

### Authentication — `/api/auth`

| Method | Route                             | Description                       | Auth Required |
|--------|-----------------------------------|-----------------------------------|---------------|
| POST   | `/api/auth/register`              | Register a new user               | ❌            |
| POST   | `/api/auth/login`                 | Log in and receive a JWT token    | ❌            |
| POST   | `/api/auth/logout`                | Logout (client discards token)    | ✅            |
| POST   | `/api/auth/forgot-password`       | Generate a password reset token   | ❌            |
| POST   | `/api/auth/reset-password/:token` | Reset password with token         | ❌            |

### Books — `/api/books`

| Method | Route              | Description                              | Auth Required |
|--------|--------------------|------------------------------------------|---------------|
| GET    | `/api/books`       | List books (own books; admin sees all)   | ✅            |
| POST   | `/api/books`       | Create a new book                        | ✅            |
| GET    | `/api/books/:id`   | Get book by ID                           | ✅            |
| PUT    | `/api/books/:id`   | Update a book (owner or admin)           | ✅            |
| DELETE | `/api/books/:id`   | Delete a book (owner or admin)           | ✅            |

### Categories — `/api/categories`

| Method | Route                          | Description                        | Auth Required | Role  |
|--------|--------------------------------|------------------------------------|---------------|-------|
| GET    | `/api/categories`              | List all categories                | ✅            | Any   |
| GET    | `/api/categories/:id`          | Get category by ID                 | ✅            | Any   |
| GET    | `/api/categories/:id/books`    | Get books in a category            | ✅            | Any   |
| POST   | `/api/categories`              | Create a category                  | ✅            | ADMIN |
| PUT    | `/api/categories/:id`          | Update a category                  | ✅            | ADMIN |
| DELETE | `/api/categories/:id`          | Delete a category (blocked if books exist — returns 409) | ✅ | ADMIN |

### Users — `/api/users`

| Method | Route                | Description                   | Auth Required | Role  |
|--------|----------------------|-------------------------------|---------------|-------|
| GET    | `/api/users/profile` | Get current user's profile    | ✅            | Any   |
| GET    | `/api/users`         | List all users                | ✅            | ADMIN |

---

## 🔑 Authentication

Include the JWT token in all protected requests:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Example Requests (curl)

> Replace `<TOKEN>` with the JWT returned from the login endpoint.

### Auth

**Register a new user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@bookstore.com", "password": "admin123"}'
```

**Logout:**

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer <TOKEN>"
```

**Forgot password:**

```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com"}'
```

**Reset password** (use the token from forgot-password response):

```bash
curl -X POST http://localhost:5000/api/auth/reset-password/<RESET_TOKEN> \
  -H "Content-Type: application/json" \
  -d '{"password": "newpassword123"}'
```

### Books

**Create a book:**

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "price": 12.99, "description": "A classic novel", "categoryId": 1}'
```

**List all books** (admin sees all; users see their own):

```bash
curl http://localhost:5000/api/books \
  -H "Authorization: Bearer <TOKEN>"
```

**Get a single book:**

```bash
curl http://localhost:5000/api/books/1 \
  -H "Authorization: Bearer <TOKEN>"
```

**Update a book:**

```bash
curl -X PUT http://localhost:5000/api/books/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title": "The Great Gatsby (Updated)", "author": "F. Scott Fitzgerald", "price": 14.99, "categoryId": 1}'
```

**Delete a book:**

```bash
curl -X DELETE http://localhost:5000/api/books/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Categories

**List all categories:**

```bash
curl http://localhost:5000/api/categories \
  -H "Authorization: Bearer <TOKEN>"
```

**Get a single category:**

```bash
curl http://localhost:5000/api/categories/1 \
  -H "Authorization: Bearer <TOKEN>"
```

**Get books in a category:**

```bash
curl http://localhost:5000/api/categories/1/books \
  -H "Authorization: Bearer <TOKEN>"
```

**Create a category** (admin only):

```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name": "Romance"}'
```

**Update a category** (admin only):

```bash
curl -X PUT http://localhost:5000/api/categories/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name": "Literary Fiction"}'
```

**Delete a category** (admin only — fails with 409 if books are assigned):

```bash
curl -X DELETE http://localhost:5000/api/categories/1 \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 🗑️ Category Deletion Policy

Deleting a category that still has books assigned to it is **blocked**. The API returns a `409 Conflict` error:

```json
{
  "success": false,
  "message": "Cannot delete category because books are assigned to it"
}
```

Reassign or delete the books first, then delete the category.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## 📄 License

This project is available under the [MIT License](LICENSE).

## 👤 Author

**Atharva Kumbhar**  
[GitHub](https://github.com/Atharvakumbhar1007)
