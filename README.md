# 📚 AI Learning Platform

An AI-powered learning platform built with Node.js (Express + Prisma), PostgreSQL, and React.js. Users can register, select categories, send prompts to OpenAI, and view their learning history. Includes an admin dashboard with filtering and pagination.

## ⚙️ Technologies Used

| Layer      | Tech Stack                      |
|------------|----------------------------------|
| Backend    | Node.js, Express.js, TypeScript |
| ORM        | Prisma                          |
| Database   | PostgreSQL                      |
| Frontend   | React.js + Redux Toolkit        |
| Auth       | JWT                             |
| DevOps     | Docker + Docker Compose         |
| AI         | OpenAI API                      |
| Docs       | Swagger (OpenAPI)               |

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js + npm
- Docker & Docker Compose
- Valid OpenAI API Key

### 🔧 Local Setup

1. Clone the repo & install dependencies:

```bash
git clone https://github.com/your-username/learning-platform.git
cd learning-platform
```

2. Copy env file:

```bash
cp backend/.env.example backend/.env
```

3. Run all services:

```bash
docker-compose up --build
```

4. Frontend: http://localhost:3000  
   Backend API: http://localhost:8000

---

## 🧪 API Docs

- Swagger UI: http://localhost:8000/api-docs

---

## 👤 Auth & Roles

- Register/login with phone & password.
- Roles: USER, ADMIN
- Auth via JWT (1-hour token)

---

## 🧠 Features

- ✅ User registration & login
- ✅ Category & Sub-category selection
- ✅ Prompt to AI & response
- ✅ Learning history per user
- ✅ Admin dashboard (users, prompt history, delete/edit)
- ✅ Filtering & pagination (admin)

---

## 📦 Folder Structure

```plaintext
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── swagger.ts
│   └── app.ts, server.ts
└── prisma/schema.prisma

frontend/
└── src/
    ├── components/
    ├── pages/
    ├── api/
    ├── features/
    ├── styles/
    └── utils/
```

---

## 📄 .env.example

```env
DATABASE_URL=postgresql://myuser:mypass@db:5432/learning_db?sslmode=disable
OPENAI_API_KEY=your_openai_key
JWT_SECRET=super_secret_key

---

## 🔐 Admin Access

Login as an admin via the login form (phone + password) with admin role. Admin can:

- View all users
- Filter/search users by name/phone
- View user prompts
- Delete user

---

## 📚 Example API Endpoints

| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| POST   | /api/users/register           | Register user                |
| POST   | /api/auth/login               | Login and get JWT            |
| GET    | /api/categories               | Get all categories           |
| GET    | /api/subcategories            | Get subcategories by cat     |
| POST   | /api/prompts                  | Submit prompt (with token)   |
| GET    | /api/admin/users?page=1      | Admin - list users           |
| GET    | /api/admin/users/:id/prompts | Admin - user prompt history  |
| DELETE | /api/admin/users/:id         | Admin - delete user          |

---

## 🧠 Prompt Request Example

```json
POST /api/prompts
{
  "categoryId": 1,
  "subCategoryId": 4,
  "prompt": "Explain what is black hole"
}
```

Response:

```json
{
  "response": "A black hole is a region of spacetime..."
}
```

---

## 📌 Assumptions

- Users identified by phone number + password
- Admins created  seeded
- Error handling + validation in place
- Swagger UI only available in dev

---

