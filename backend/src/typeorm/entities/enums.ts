export enum LockMode {
  DirtyRead = 'dirty_read',
  PerssimisticWrite = 'pessimistic_write',
  PerssimisticRead = 'pessimistic_read',
  PerssimisticPartialWrite = 'pessimistic_partial_write',
  PerssimisticWriteOrFail = 'pessimistic_write_or_fail',
  ForNoKeyUpdate = 'for_no_key_update',
  ForKeyShare = 'for_key_share',
}
