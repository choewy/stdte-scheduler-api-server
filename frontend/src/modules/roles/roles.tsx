import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useRolesConnection } from './hooks';
import { rolesState } from './states';

export const RolesPage: FC = () => {
  const connection = useRolesConnection();

  const roles = useRecoilValue(rolesState);
  const [name, setName] = useState<string>('');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setName(value);
    },
    [setName],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await connection.emit('role:create', { name });
      setName('');
    },
    [connection, name, setName],
  );

  return (
    <div>
      <h1>RolesPage</h1>
      <div>
        {roles.map((role) => {
          return (
            <div key={JSON.stringify(role)}>
              <Link to={`/roles/${role.rid}`}>
                {role.name}({role.users.length})
              </Link>
            </div>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={onChange} />
      </form>
    </div>
  );
};
