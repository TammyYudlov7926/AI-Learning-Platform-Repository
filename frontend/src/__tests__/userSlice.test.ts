import userReducer, { loginSuccess, logout, UserState } from '../features/user/userSlice';

describe('userSlice', () => {
  const initialState: UserState = {
    token: null,
    role: null,
    phone: null,
    isAuthenticated: false,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle loginSuccess', () => {
    const loginData = {
      token: 'test-token',
      role: 'USER' as const,
      phone: '0501234567',
    };

    const action = loginSuccess(loginData);
    const state = userReducer(initialState, action);

    expect(state.token).toBe('test-token');
    expect(state.role).toBe('USER');
    expect(state.phone).toBe('0501234567');
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const loggedInState: UserState = {
      token: 'test-token',
      role: 'USER',
      phone: '0501234567',
      isAuthenticated: true,
    };

    const action = logout();
    const state = userReducer(loggedInState, action);

    expect(state.token).toBe(null);
    expect(state.role).toBe(null);
    expect(state.phone).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });
});