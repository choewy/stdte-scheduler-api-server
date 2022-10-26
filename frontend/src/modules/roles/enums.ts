export enum RoleEvent {
  EmitAll = 'role:all',
  OnCreateSync = 'role:create:sync',
  OnUpdateSync = 'role:update:sync',
  OnDeleteSync = 'role:delete:sync',
  EmitDelete = 'role:delete',
  EmitCreate = 'role:create',
  EmitUpdate = 'role:update',
  EmitSearchUser = 'role:user:search',
  EmitMemberAppend = 'role:member:append',
  EmitMemberRemove = 'role:member:remove',
}
