import { alertState } from '@/app';
import { userApi, UserResponseData } from '@/apis/user';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../user.state';

export const UserDetailPage = () => {
  const param = useParams<{ id: string }>();

  const [state, setState] = useState<UserResponseData>(new UserState());
  const setAlert = useSetRecoilState(alertState);

  const getUser = async () => {
    await userApi.user(param?.id as string, { setState, setAlert });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1>User Detail</h1>
      <div>ID: {state.id}</div>
      <div>USERNAME: {state.username}</div>
      <div>NICKNAME: {state.nickname}</div>
      <div>EMAIL: {state.email}</div>
    </div>
  );
};
