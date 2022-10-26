import { RoutePath } from '@/app';
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { TeamEvent } from './enums';
import { useTeamConnection } from './hooks';
import { teamsState } from './states';

export const TeamsPage: FC = () => {
  const connection = useTeamConnection();

  const teams = useRecoilValue(teamsState);
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
      await connection.emit(TeamEvent.EmitCreate, { name });
      setName('');
    },
    [connection, name, setName],
  );

  return (
    <div>
      <h1>TEAMS PAGE</h1>
      <div>
        {teams.map((team) => {
          return (
            <div key={JSON.stringify(team)}>
              <Link to={`${RoutePath.Teams}/${team.tid}`}>
                {team.name}({team.members.length})
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
