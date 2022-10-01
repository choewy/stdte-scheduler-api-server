import { ROUTER } from '@/configs';
import { emitUserSignEvent } from '@/events';
import { axiosInstance } from '@/utils/axios';
import { saveTokens } from '@/utils/cookie';
import { apiExceptionHandler } from '../helpers';
import { DefaultApiProps } from '../interfaces';
import {
  AuthResponseData,
  SignInRequestBody,
  SignUpRequestBody,
} from './interfaces';

export const auth = async (): Promise<AuthResponseData> => {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: '/auth',
    });
    emitUserSignEvent(data);
    return data;
  } catch (e) {
    throw e;
  }
};

export const signin = async (
  body: SignInRequestBody,
  { navigate, resetState, setAlert }: DefaultApiProps,
): Promise<void> => {
  try {
    const { data } = await axiosInstance({
      method: 'POST',
      url: '/auth/signin',
      data: body,
    });
    saveTokens(data);
    resetState && resetState();
    navigate && navigate(ROUTER.home, { replace: true });
  } catch (e) {
    apiExceptionHandler(e, setAlert);
  }
};

export const signup = async (
  body: SignUpRequestBody,
  { navigate, resetState, setAlert }: DefaultApiProps,
): Promise<void> => {
  try {
    const { data } = await axiosInstance({
      method: 'POST',
      url: '/auth/signup',
      data: body,
    });
    saveTokens(data);
    resetState && resetState();
    navigate && navigate(ROUTER.home, { replace: true });
  } catch (e) {
    apiExceptionHandler(e, setAlert);
  }
};
