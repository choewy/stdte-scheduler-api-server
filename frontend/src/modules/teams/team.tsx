import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamEvent } from './enums';
import {
  useTeamConnection,
  useTeamDeleteCallback,
  useTeamSearchUserCallback,
  useTeamMemberAppendCallback,
} from './hooks';
import { TeamUserType, useTeamState } from './states';

export const TeamPage = () => {
  const navigate = useNavigate();
  const connection = useTeamConnection();

  const [role, setRole] = useTeamState();
  const { tid, name, members, ...policies } = role;

  const [users, setUsers] = useState<TeamUserType[]>([]);

  const onDelete = useCallback(async () => {
    await connection.emit(
      TeamEvent.EmitDelete,
      { tid },
      useTeamDeleteCallback(navigate),
    );
  }, [connection, navigate, tid]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setRole({ ...role, name: value });
    },
    [role, setRole],
  );

  const onChecked = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      const body = { tid, [name]: checked };
      await connection.emit(TeamEvent.EmitUpdate, body);
    },
    [connection, tid],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const body = { tid, name };
      await connection.emit(TeamEvent.EmitUpdate, body);
    },
    [connection, tid, name],
  );

  const onChangeKeyword = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      if (!value) {
        setUsers([]);
        return;
      }

      await connection.emit(
        TeamEvent.EmitSearchUser,
        { tid, keyword: value },
        useTeamSearchUserCallback(setUsers),
      );
    },
    [connection, tid, setUsers],
  );

  const onMemberRemove = useCallback(
    (uid: number) => {
      return async () => {
        await connection.emit(TeamEvent.EmitMemberRemove, { tid, uid });
      };
    },
    [connection, tid],
  );

  const onMemberAppend = useCallback(
    (uid: number) => {
      return async () => {
        await connection.emit(
          TeamEvent.EmitMemberAppend,
          { tid, uid },
          useTeamMemberAppendCallback(uid, users, setUsers),
        );
      };
    },
    [connection, users, setUsers, tid],
  );

  return (
    <div>
      <button onClick={onDelete}>삭제</button>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onSubmit={onSubmit}
      >
        <input value={name} onChange={onChange} />
      </form>
      <div>
        {members.map((member) => {
          return (
            <div key={'member' + JSON.stringify(member)}>
              <div>
                <span>{member.name}</span>
                <button onClick={onMemberRemove(member.uid)}>제거</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div>
          <input
            name="keyword"
            placeholder="사용자 검색"
            onChange={onChangeKeyword}
          />
        </div>
        <div>
          <h3>검색 결과</h3>
          {users.map((user) => {
            return (
              <div key={'user' + JSON.stringify(user)}>
                <div>
                  <span>
                    {user.name}({user.email})
                  </span>
                  <button onClick={onMemberAppend(user.uid)}>추가</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
