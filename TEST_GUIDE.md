# 🧪 Testing Guide

## Frontend Tests (Jest + React Testing Library)

### Running Tests
```bash
cd frontend
npm test                    # Interactive mode
npm test -- --coverage     # With coverage
npm test -- --watchAll     # Watch all files
```

### Test Structure
```
frontend/src/__tests__/
├── userSlice.test.ts       # Redux user slice tests
├── ProtectedRoute.test.tsx # Protected route component tests
└── api.test.ts            # API services tests
```

### Test Coverage
- ✅ **Redux Slices**: User authentication state
- ✅ **Components**: ProtectedRoute with different user roles
- ✅ **API Services**: Auth, Categories, Prompts APIs
- ✅ **Mocking**: localStorage, axios, navigation

## Backend Tests (Jest + Supertest)

### Running Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage report
```

### Test Structure
```
backend/src/__tests__/
├── auth.test.ts           # Authentication endpoints
├── categories.test.ts     # Categories & subcategories
├── prompts.test.ts        # AI prompts endpoints
└── middleware.test.ts     # Authentication middleware
```

### Test Coverage
- ✅ **Auth Endpoints**: Login, register validation
- ✅ **Protected Routes**: Token authentication
- ✅ **Categories**: CRUD operations
- ✅ **Prompts**: AI prompt creation and retrieval
- ✅ **Middleware**: JWT token validation

## Test Examples

### Frontend Component Test
```typescript
it('should redirect non-admin user from admin route', () => {
  const userState = { role: 'USER', isAuthenticated: true };
  
  renderWithProviders(
    <ProtectedRoute adminOnly>
      <TestComponent />
    </ProtectedRoute>,
    userState
  );
  
  expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
});
```

### Backend API Test
```typescript
it('should return 401 without token', async () => {
  const response = await request(app)
    .post('/api/prompts')
    .send({ prompt: 'Test prompt' });
    
  expect(response.status).toBe(401);
});
```

## Running All Tests

### Individual Projects
```bash
# Frontend only
cd frontend && npm test

# Backend only  
cd backend && npm test
```

### Docker Environment
```bash
# Run tests in containers
docker-compose exec frontend npm test
docker-compose exec backend npm test
```

## Test Features

### Frontend
- 🔍 **Component Testing**: React components with Redux
- 🔄 **State Management**: Redux actions and reducers
- 🌐 **API Mocking**: Axios requests and responses
- 🛡️ **Route Protection**: Authentication and authorization

### Backend
- 🔐 **Authentication**: JWT token validation
- 📡 **API Endpoints**: Request/response validation
- 🛡️ **Middleware**: Security and validation layers
- 📊 **Error Handling**: Proper HTTP status codes

## Coverage Reports

Tests include coverage for:
- **Statements**: Code execution coverage
- **Branches**: Conditional logic coverage  
- **Functions**: Function call coverage
- **Lines**: Line-by-line coverage

View coverage reports in:
- Frontend: `frontend/coverage/lcov-report/index.html`
- Backend: `backend/coverage/lcov-report/index.html`