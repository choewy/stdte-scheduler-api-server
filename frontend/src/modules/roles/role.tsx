import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RolePolicyKeyType, rolePolicyLabel } from './constants';
import { RoleEvent } from './enums';
import {
  useRoleDeleteCallback,
  useRoleMemberAppendCallback,
  useRolesConnection,
  useRoleSearchUserCallback,
} from './hooks';
import { RoleUserType, useRoleState } from './states';

export const RolePage = () => {
  const navigate = useNavigate();
  const connection = useRolesConnection();

  const [role, setRole] = useRoleState();
  const { rid, name, members, ...policies } = role;

  const [users, setUsers] = useState<RoleUserType[]>([]);

  const onDelete = useCallback(async () => {
    await connection.emit(
      RoleEvent.EmitDelete,
      { rid },
      useRoleDeleteCallback(navigate),
    );
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
      const body = { rid, [name]: checked };
      await connection.emit(RoleEvent.EmitUpdate, body);
    },
    [connection, rid],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const body = { rid, name };
      await connection.emit(RoleEvent.EmitUpdate, body);
    },
    [connection, rid, name],
  );

  const onChangeKeyword = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      if (!value) {
        setUsers([]);
        return;
      }

      await connection.emit(
        RoleEvent.EmitSearchUser,
        { rid, keyword: value },
        useRoleSearchUserCallback(setUsers),
      );
    },
    [connection, rid, setUsers],
  );

  const onMemberRemove = useCallback(
    (uid: number) => {
      return async () => {
        await connection.emit(RoleEvent.EmitMemberRemove, { rid, uid });
      };
    },
    [connection, rid],
  );

  const onMemberAppend = useCallback(
    (uid: number) => {
      return async () => {
        await connection.emit(
          RoleEvent.EmitMemberAppend,
          { rid, uid },
          useRoleMemberAppendCallback(uid, users, setUsers),
        );
      };
    },
    [connection, users, setUsers, rid],
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
          const label = rolePolicyLabel[key as RolePolicyKeyType];

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
