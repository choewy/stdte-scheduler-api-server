import { alertState } from '@/components';
import { CustomTable } from '@/components/elements/custom-table';
import { userApi } from '@/utils/apis/user';
import { FC, MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../user.state';
import { userColumns } from './constants';

export const UserListPage: FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useRecoilState(userState);
  const setAlert = useSetRecoilState(alertState);

  const getUsers = async () => {
    await userApi.users({ setAlert, setState });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onCellClick: MouseEventHandler<HTMLTableCellElement> = (e) => {
    const id = e.currentTarget.parentElement?.children[0].textContent;
    if (id) {
      navigate(id, { relative: 'path' });
    }
  };

  return (
    <CustomTable
      columns={userColumns}
      rows={state.rows}
      onCellClick={onCellClick}
    />
  );
};
