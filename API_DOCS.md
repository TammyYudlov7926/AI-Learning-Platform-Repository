# 📚 API Documentation

## 🚀 Swagger UI

התיעוד המלא של ה-API זמין ב-Swagger UI:

**URL**: http://localhost:8000/api-docs

## 🔐 Authentication

כל ה-endpoints (חוץ מ-login ו-register) דורשים JWT token:

```bash
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints Overview

### 🔑 Authentication
- `POST /api/auth/login` - Login user
- `POST /api/users/register` - Register new user

### 📂 Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

### 📁 SubCategories  
- `GET /api/subcategories` - Get all subcategories
- `GET /api/subcategories/{id}` - Get subcategory by ID
- `POST /api/subcategories` - Create subcategory
- `PUT /api/subcategories/{id}` - Update subcategory
- `DELETE /api/subcategories/{id}` - Delete subcategory

### 🤖 Prompts
- `POST /api/prompts` - Create AI prompt
- `GET /api/prompts/user/{phone}` - Get user prompts

### 👨‍💼 Admin (Admin Only)
- `GET /api/admin/users` - List users (with pagination)
- `GET /api/admin/users/{id}/prompts` - Get user prompt history
- `PATCH /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

## 🧪 Testing with Swagger

1. **Start the server**: `docker-compose up --build`
2. **Open Swagger UI**: http://localhost:8000/api-docs
3. **Login**: Use `/api/auth/login` endpoint
4. **Authorize**: Click "Authorize" button and paste JWT token
5. **Test endpoints**: Try any endpoint with authentication

## 📝 Example Usage

### Login
```json
POST /api/auth/login
{
  "phone": "0501234567",
  "password": "123456"
}
```

### Create Prompt
```json
POST /api/prompts
Authorization: Bearer <token>
{
  "categoryId": 1,
  "subCategoryId": 4,
  "prompt": "Explain what is a black hole"
}
```

## 🔧 Schema Definitions

All API schemas are documented in Swagger UI with:
- **User**: User information and roles
- **Category**: Learning categories
- **SubCategory**: Sub-categories under main categories  
- **Prompt**: AI prompts and responses
- **Error**: Error response format

## 📊 Features

- ✅ **Interactive Documentation** - Test APIs directly from browser
- ✅ **JWT Authentication** - Secure API access
- ✅ **Schema Validation** - Request/response validation
- ✅ **Error Handling** - Detailed error responses
- ✅ **Pagination Support** - For admin user listing
- ✅ **Search & Filter** - Admin user management