import { UpdateUserRequestBody, UsersState } from '@/pages';
import { axiosInstance } from '@/utils/axios';
import { apiExceptionHandler } from '../helpers';
import { DefaultApiProps } from '../interfaces';
import { UserResponseData } from './interfaces';

export const users = async ({
  setAlert,
  setState,
}: DefaultApiProps<UsersState>): Promise<void> => {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: '/users',
    });
    setState && setState(new UsersState(data));
  } catch (e) {
    apiExceptionHandler(e, setAlert);
  }
};

export const user = async (
  id: string,
  { setAlert, setState }: DefaultApiProps,
): Promise<void> => {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: `/users/${id}`,
    });
    setState && setState(data);
  } catch (e) {
    apiExceptionHandler(e, setAlert);
  }
};

export const update = async (
  id: number,
  body: UpdateUserRequestBody,
): Promise<UserResponseData> => {
  try {
    const { data } = await axiosInstance({
      method: 'PATCH',
      url: `/users/${id}`,
      data: body,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
