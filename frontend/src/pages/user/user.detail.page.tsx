import { useParams } from 'react-router-dom';
import { useUserState } from './user.hook';

export const UserDetailPage = () => {
  const param = useParams();
  const state = useUserState(param as { id: string });

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
