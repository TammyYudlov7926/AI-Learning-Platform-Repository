import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth';
import { Request, Response, NextFunction } from 'express';

// Mock JWT
jest.mock('jsonwebtoken');
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

// Extend Request type for testing
interface TestRequest extends Request {
  user?: any;
}

describe('Auth Middleware', () => {
  let mockRequest: Partial<TestRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it('should return 401 if no token provided', () => {
    mockRequest.headers = {};

    authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    mockRequest.headers = {
      authorization: 'Bearer invalid-token'
    };

    mockedJwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid', () => {
    mockRequest.headers = {
      authorization: 'Bearer valid-token'
    };

    const mockUser = { id: 1, phone: '0501234567', role: 'USER' };
    mockedJwt.verify.mockReturnValue(mockUser as any);

    authenticate(mockRequest as TestRequest, mockResponse as Response, nextFunction);

    expect((mockRequest as TestRequest).user).toEqual(mockUser);
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});