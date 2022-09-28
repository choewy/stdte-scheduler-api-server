import { PolicyRange, Role, RoleType, Team } from './typeorm/entities';

export const roleDataRows: Array<{
  range: PolicyRange;
  data: Partial<Role>;
}> = [
  {
    range: PolicyRange.All,
    data: {
      type: RoleType.Master,
      name: '마스터',
      visible: false,
      editable: false,
    },
  },
  {
    range: PolicyRange.System,
    data: {
      type: RoleType.Admin,
      name: '관리자',
      visible: true,
      editable: false,
    },
  },
  {
    range: PolicyRange.None,
    data: {
      type: RoleType.Default,
      name: '역할없음',
      visible: true,
      editable: false,
    },
  },
];

export const teamDataRows: Partial<Team>[] = [
  {
    name: '소속없음',
    default: true,
    editable: false,
  },
];
