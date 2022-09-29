import { axiosInstance } from '@/utils/axios';
import { UserResponseData } from './interfaces';

export const users = async (): Promise<UserResponseData[]> => {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: '/users',
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const user = async (id: string): Promise<UserResponseData> => {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: `/users/${id}`,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
