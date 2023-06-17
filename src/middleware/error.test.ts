import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { errorHandler } from './error.js';

describe('Given the handleError middleware', () => {
  describe('When it is instantiate with a HttpError', () => {
    const req = {} as Request;
    const res = {
      status: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    const mockConsoleError = jest.fn();

    beforeAll(() => {
      global.console.error = mockConsoleError;
    });

    test('Then it should set a status, a statusMessage and an error object', () => {
      const error = new HttpError(
        404,
        'Not found',
        'The request was not found'
      );
      errorHandler(error, req, res, next);
      expect(res.status).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith(
        error.status,
        error.statusMessage,
        error.message
      );
    });

    test('When it is not instantiate with a HttpError, it should set status to 500 and call the send method with an error object', () => {
      const error = new Error('Error');

      errorHandler(error, req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ error: 'Error' });
      expect(next).not.toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith(error);
    });
  });
});
