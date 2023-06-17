import { User } from '../entities/user';
import { HttpError } from '../types/http.error';
import { UserModel } from './user.mongo.model';
import { UserRepo } from './user.mongo.repository';

jest.mock('./user.mongo.model.js');

describe('Given a UserRepo class', () => {
  const repo = new UserRepo();

  describe('When it is instantiated and query method is called', () => {
    test('Then UserModel.find should have been called', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.query();
      expect(UserModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When it is instantiated and queryById method is called', () => {
    test('Then UserModel.findById should have been called', async () => {
      const mockedUser = { id: '1' } as User;
      const mockedId = '1';
      const exec = jest.fn().mockResolvedValue([mockedUser]);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.queryById(mockedId);
      expect(UserModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([mockedUser]);
    });
    test('Then it should throw an error when the method queryById finds an invalid id', async () => {
      const mockId = '3';
      const exec = jest.fn().mockResolvedValue(null);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });
      await expect(repo.queryById(mockId)).rejects.toThrowError();
    });
  });

  describe('When it is instantiated and search method is called', () => {
    test('Then userModel.find should been called', async () => {
      const mockData = { key: '', value: '' };
      const exec = jest.fn().mockResolvedValue([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.search(mockData);
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When it is instantiated and create method is called', () => {
    test('Then method UserModel.create method should been called', async () => {
      const mockUser = {
        id: '1',
        userName: 'Pablo',
        email: 'pablo@sample.com',
        password: '1234',
      };
      UserModel.create = jest.fn().mockReturnValueOnce(mockUser);
      const result = await repo.create(mockUser);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('When it is instantiated and delete method is called', () => {
    test('Then UserModel.delete should be used', async () => {
      const mockId = '6';
      const exec = jest.fn();
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });
      await repo.delete(mockId);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
    });

    test('Then UserModel.findByIdAndDelete should throw HttpError when result is null', async () => {
      const mockedId = '1';
      const exec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });
      await expect(repo.delete(mockedId)).rejects.toThrow(HttpError);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(mockedId);
      expect(exec).toHaveBeenCalled();
    });
  });
});
