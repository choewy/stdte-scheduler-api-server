export enum TeamEvent {
  OnCreateSync = 'team:create:sync',
  OnUpdateSync = 'team:update:sync',
  OnDeleteSync = 'team:delete:sync',
  EmitAll = 'team:all',
  EmitDelete = 'team:delete',
  EmitCreate = 'team:create',
  EmitUpdate = 'team:update',
  EmitSearchUser = 'team:user:search',
  EmitMemberAppend = 'team:member:append',
  EmitMemberRemove = 'team:member:remove',
}
