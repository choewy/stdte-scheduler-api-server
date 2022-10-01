import {
  Check as CheckIcon,
  CancelOutlined as CancelIcon,
} from '@mui/icons-material';
import { UserStatus } from '@/apis';
import { userApi } from '@/apis/user';
import { Box, Button, IconButton } from '@mui/material';
import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserData } from '../interfaces';
import { userState } from '../user.state';

type ButtonColor = 'primary' | 'error' | 'warning';

interface Props {
  row: UserData;
  disable?: boolean;
}

export const UserStatusButtons: FC<Props> = ({ row }: Props) => {
  const [over, setOver] = useState<boolean>(false);
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

  const onMouseOver: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setOver(true);
  }, []);

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setOver(false);
  }, []);

  const onOkClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      await updateUser(UserStatus.Enable);
    }, [row, setState]);

  const onRejectClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      await updateUser(UserStatus.Reject);
    }, [row, setState]);

  let disabled = true;
  let buttonText = '승인완료';
  let buttonColor: ButtonColor = 'primary';
  const buttons = [];

  if (row.status === UserStatus.Reject) {
    disabled = false;
    buttonText = '가입거부';
    buttonColor = 'error';
    buttons.push(
      <Button
        key="user-status-button-success"
        onClick={onOkClick}
        color={'primary'}
      >
        승인
      </Button>,
    );
  }

  if (row.status === UserStatus.Wait) {
    disabled = false;
    buttonText = '대기중';
    buttonColor = 'warning';
    buttons.push(
      <IconButton
        key="user-status-button-success"
        onClick={onOkClick}
        color="success"
        size="small"
      >
        <CheckIcon />
      </IconButton>,
      <IconButton
        key="user-status-button-cancel"
        onClick={onRejectClick}
        color="error"
        size="small"
      >
        <CancelIcon />
      </IconButton>,
    );
  }

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      component="div"
      onMouseOver={disabled ? undefined : onMouseOver}
      onMouseLeave={disabled ? undefined : onMouseLeave}
    >
      {over ? (
        <>{buttons}</>
      ) : (
        <Button disabled={disabled} color={buttonColor}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
