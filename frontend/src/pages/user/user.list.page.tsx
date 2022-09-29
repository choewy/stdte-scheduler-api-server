import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useUsersState } from './user.hook';

export const UserListPage: FC = () => {
  const state = useUsersState();

  return (
    <div>
      <h1>User List Page</h1>
      <h3>TOTAL : {state.count}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>아이디</th>
            <th>닉네임</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {state.rows.map((user) => (
            <tr key={JSON.stringify(user)}>
              <td>
                <Link to={`${user.id}`}>{user.id}</Link>
              </td>
              <td>{user.username}</td>
              <td>{user.nickname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
