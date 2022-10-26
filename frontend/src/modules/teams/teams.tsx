import { loadingState, RoutePath } from '@/app';
import {
  FC,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TeamEvent } from './enums';
import { useTeamConnection } from './hooks';
import { teamsState } from './states';

export const TeamsPage: FC = () => {
  const connection = useTeamConnection();
  const setLoading = useSetRecoilState(loadingState);

  const teams = useRecoilValue(teamsState);
  const [name, setName] = useState<string>('');

  const { load, rows } = teams;

  useEffect(() => {
    setLoading(load);
  }, [load]);

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
      connection.emit(TeamEvent.EmitCreate, { name });
      setName('');
    },
    [connection, name, setName],
  );

  return (
    <div>
      <h1>TEAMS PAGE</h1>
      <div>
        {rows.map((row) => {
          return (
            <div key={JSON.stringify(row)}>
              <Link to={`${RoutePath.Teams}/${row.tid}`}>
                {row.name}({row.members.length})
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
