import { userApi, UserResponseData } from '@/utils/apis/user';
import { useRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { UsersState, UserState, userState } from './user.state';

export const useUsersState = () => {
  const [state, setState] = useRecoilState(userState);

  const getUsers = useCallback(async () => {
    try {
      const users = await userApi.users();
      setState(new UsersState(users));
    } catch (e) {
      console.log(e);
    }
  }, [setState]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return state;
};

export const useUserState = (param: { id: string }) => {
  const [state, setState] = useState<UserResponseData>(new UserState());

  const getUser = useCallback(async () => {
    try {
      const user = await userApi.user(param.id);
      setState(new UserState(user));
    } catch (e) {
      console.log(e);
    }
  }, [setState]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return state;
};
