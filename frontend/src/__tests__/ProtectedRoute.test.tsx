import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProtectedRoute from '../components/ProtectedRoute';
import userReducer from '../features/user/userSlice';

const createMockStore = (userState: any) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: {
      user: userState,
    },
  });
};

const TestComponent = () => <div>Protected Content</div>;

const renderWithProviders = (component: React.ReactElement, userState: any) => {
  const store = createMockStore(userState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProtectedRoute', () => {
  it('should redirect to login when not authenticated', () => {
    const userState = {
      token: null,
      role: null,
      phone: null,
      isAuthenticated: false,
    };

    renderWithProviders(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>,
      userState
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children when authenticated', () => {
    const userState = {
      token: 'test-token',
      role: 'USER',
      phone: '0501234567',
      isAuthenticated: true,
    };

    renderWithProviders(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>,
      userState
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect non-admin user from admin route', () => {
    const userState = {
      token: 'test-token',
      role: 'USER',
      phone: '0501234567',
      isAuthenticated: true,
    };

    renderWithProviders(
      <ProtectedRoute adminOnly>
        <TestComponent />
      </ProtectedRoute>,
      userState
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should allow admin user to access admin route', () => {
    const userState = {
      token: 'test-token',
      role: 'ADMIN',
      phone: '0501234567',
      isAuthenticated: true,
    };

    renderWithProviders(
      <ProtectedRoute adminOnly>
        <TestComponent />
      </ProtectedRoute>,
      userState
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});