import { FC, ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { SocketInstance } from '@/utils';
import { RoleEvent } from '../enums';

interface Props {
  connection: SocketInstance;
}

export const RoleCreateFormElement: FC<Props> = ({ connection }) => {
  const [name, setName] = useState<string>('');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setName(value);
    },
    [setName],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      connection.emit(RoleEvent.EmitCreate, { name });
      setName('');
    },
    [connection, name, setName],
  );

  return (
    <Box component="form" onSubmit={onSubmit} sx={{}}>
      <input value={name} onChange={onChange} />
    </Box>
  );
};
