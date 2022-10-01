import { UserStatus } from '@/apis';
import { userApi } from '@/apis/user';
import { Switch } from '@mui/material';
import { ChangeEventHandler, FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserData } from '../interfaces';
import { userState } from '../user.state';

interface Props {
  row: UserData;
}

export const UserStatusSwitch: FC<Props> = ({ row }: Props) => {
  const disabled = ![UserStatus.Enable, UserStatus.Disable].includes(
    row.status,
  );

  const setState = useSetRecoilState(userState);

  const updateUser = async (status: UserStatus) => {
    try {
      const newUser = await userApi.update(row.id, { status });
      setState((prev) => ({
        ...prev,
        rows: prev.rows.map((row) => (row.id === newUser.id ? newUser : row)),
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      updateUser(UserStatus.Enable);
    } else {
      updateUser(UserStatus.Disable);
    }
  };

  return (
    <Switch
      disabled={disabled}
      checked={row.status === UserStatus.Enable}
      onChange={onChange}
    />
  );
};
