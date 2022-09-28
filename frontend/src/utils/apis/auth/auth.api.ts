import { axiosInstance } from '@/utils/axios';
import {
  AuthResponseData,
  SignInRequestBody,
  SignResponseData,
  SignUpRequestBody,
} from './interfaces';

export const auth = async (): Promise<AuthResponseData> => {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: '/auth',
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const signin = async (
  body: SignInRequestBody,
): Promise<SignResponseData> => {
  try {
    const { data } = await axiosInstance({
      method: 'POST',
      url: '/auth/signin',
      data: body,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const signup = async (
  body: SignUpRequestBody,
): Promise<SignResponseData> => {
  try {
    const { data } = await axiosInstance({
      method: 'POST',
      url: '/auth/signup',
      data: body,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
