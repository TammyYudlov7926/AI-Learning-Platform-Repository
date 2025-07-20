# Frontend Structure

## 📁 Directory Structure

```
src/
├── api/                    # API services
│   ├── index.ts           # Axios instance with interceptors
│   ├── auth.api.ts        # Authentication API
│   ├── categories.api.ts  # Categories API
│   └── prompts.api.ts     # Prompts API
├── components/            # Reusable components
│   ├── Admin/
│   ├── auth/
│   ├── common/
│   └── ...
├── features/              # Redux slices
│   ├── user/
│   │   └── userSlice.ts
│   ├── prompt/
│   │   └── promptSlice.ts
│   └── categories/
│       └── categoriesSlice.ts
├── hooks/                 # Custom hooks
│   └── redux.ts          # Typed Redux hooks
├── pages/                 # Page components
├── styles/               # CSS files
├── types/                # TypeScript types
│   └── index.ts
├── utils/                # Utility functions
├── App.tsx
├── index.tsx
└── store.ts              # Redux store
```

## 🔧 Key Features

### Redux Store
- **User Slice**: Authentication state, user info
- **Prompts Slice**: User prompts, AI responses
- **Categories Slice**: Categories and subcategories

### API Layer
- Centralized axios instance with token interceptor
- Organized by feature (auth, categories, prompts)
- Type-safe API calls

### Custom Hooks
- `useAppDispatch`: Typed dispatch hook
- `useAppSelector`: Typed selector hook

### Protected Routes
- Authentication check
- Admin-only routes support

## 🚀 Usage Examples

### Using Redux
```tsx
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCategories } from '../features/categories/categoriesSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector(state => state.categories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
};
```

### API Calls
```tsx
import { authAPI } from '../api/auth.api';

const login = async () => {
  const result = await authAPI.login(phone, password);
};
```