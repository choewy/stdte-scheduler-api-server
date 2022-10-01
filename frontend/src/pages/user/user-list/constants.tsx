import { CustomTableColumnData } from '@/components/elements/custom-table';
import { UserData, UserRoleData, UserTeamData } from '../interfaces';
import { UserStatusButtons } from './user-list.status.buttons';
import { UserStatusSwitch } from './user-list.status.switch';

export const userColumns: CustomTableColumnData<UserData>[] = [
  {
    key: 'id',
    type: 'value',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'username',
    type: 'value',
    label: '아이디',
    align: 'center',
  },
  {
    key: 'nickname',
    type: 'value',
    label: '닉네임',
    align: 'center',
  },
  {
    key: 'email',
    type: 'value',
    label: '이메일',
    align: 'center',
  },
  {
    key: 'roles',
    type: 'value',
    label: '역할',
    align: 'center',
    format: (roles: UserRoleData[]) =>
      roles.map((role) => role.name).join(', '),
  },
  {
    key: 'teams',
    type: 'value',
    label: '소속',
    align: 'center',
    format: (teams: UserTeamData[]) =>
      teams.map((team) => team.name).join(', '),
  },
  {
    key: 'createdAt',
    type: 'component',
    label: '가입일시(수정일시)',
    align: 'center',
    style: {
      whiteSpace: 'pre-line',
    },
    component: ({ row }) => (
      <>{`${row?.createdAt}${
        row?.createdAt === row?.updatedAt ? '' : `\n(${row?.updatedAt})`
      }`}</>
    ),
  },
  {
    key: 'status',
    type: 'component',
    label: '가입상태',
    align: 'center',
    minWidth: 100,
    component: ({ row }) => {
      const user = row as UserData;
      return <UserStatusButtons row={user} />;
    },
  },
  {
    key: 'status',
    type: 'component',
    label: '비활성/활성',
    align: 'center',
    minWidth: 110,
    component: ({ row }) => {
      const user = row as UserData;
      return <UserStatusSwitch row={user} />;
    },
  },
];
