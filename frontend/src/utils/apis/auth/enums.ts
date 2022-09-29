export enum UserStatus {
  Wait = 'wait',
  Enable = 'enable',
  Disable = 'disable',
}

export enum RoleType {
  Master = 'master',
  Admin = 'admin',
  Manager = 'manager',
  Member = 'member',
  Viewer = 'viewer',
  Default = 'default',
}

export enum PolicyRange {
  All = 'all',
  System = 'system',
  Team = 'team',
  Only = 'only',
  None = 'none',
}
