import { ChangeEvent, FormEvent, Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRolesConnection, useRoleState } from './hooks';
import { RoleUserType } from './states';
import { rolePolicyLabel } from './states/role';

export const RolePage = () => {
  const navigate = useNavigate();
  const connection = useRolesConnection();

  const [role, setRole] = useRoleState();

  const { rid, name, users, ...policies } = role;

  const [keyword, setKeyword] = useState<string>('');
  const [members, setMembers] = useState<RoleUserType[]>([]);

  const onDelete = useCallback(async () => {
    await connection.emit('role:delete', { rid }, () => {
      navigate('/roles', { replace: true });
    });
  }, [connection, navigate, rid]);

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

      await connection.emit('role:update', {
        rid,
        [name]: checked,
      });
    },
    [connection, rid],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await connection.emit('role:update', {
        rid,
        name,
      });
    },
    [connection, rid, name],
  );

  const onChangeKeyword = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      await connection.emit(
        'role:member:search',
        { rid, keyword: e.target.value },
        (rows: RoleUserType[]) => {
          setMembers(rows);
        },
      );
    },
    [connection, rid, keyword, setMembers],
  );

  const onMemberRemove = useCallback(
    (uid: number) => {
      return async () => {
        await connection.emit('role:member:remove', { rid, uid });
      };
    },
    [connection, rid],
  );

  const onMemberAppend = useCallback(
    (uid: number) => {
      return async () => {
        await connection.emit('role:member:append', { rid, uid }, () => {
          setMembers(members.filter((member) => member.uid !== uid));
        });
      };
    },
    [connection, members, setMembers, rid],
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
        {Object.entries(policies).map(([key, value]) => {
          const label = rolePolicyLabel[key as keyof typeof rolePolicyLabel];

          return (
            <div key={JSON.stringify(key + value)} style={{ display: 'flex' }}>
              <label>{label}</label>
              <input
                name={key}
                type="checkbox"
                checked={value as boolean}
                onChange={onChecked}
              />{' '}
            </div>
          );
        })}
      </div>
      <div>
        {users.map((user) => {
          return (
            <div key={'user' + JSON.stringify(user)}>
              <div>
                <span>{user.name}</span>
                <button onClick={onMemberRemove(user.uid)}>제거</button>
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
          {members.map((member) => {
            return (
              <div key={'member' + JSON.stringify(member)}>
                <div>
                  <span>
                    {member.name}({member.email})
                  </span>
                  <button onClick={onMemberAppend(member.uid)}>추가</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
