// Mock the entire api module
jest.mock('../api/index', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

import api from '../api/index';
const mockApi = api as jest.Mocked<typeof api>;

describe('API Mock Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should mock api calls correctly', async () => {
    const mockResponse = { data: { token: 'test-token' } };
    mockApi.post.mockResolvedValue(mockResponse);

    const response = await mockApi.post('/auth/login', { phone: '123', password: '456' });

    expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
      phone: '123',
      password: '456',
    });
    expect(response.data.token).toBe('test-token');
  });

  it('should mock get requests', async () => {
    const mockCategories = [{ id: 1, name: 'Science' }];
    mockApi.get.mockResolvedValue({ data: mockCategories });

    const response = await mockApi.get('/categories');

    expect(mockApi.get).toHaveBeenCalledWith('/categories');
    expect(response.data).toEqual(mockCategories);
  });
});