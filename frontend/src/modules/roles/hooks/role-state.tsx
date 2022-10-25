import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rolesState, RoleType } from '../states';

const initRoleState: RoleType = {
  rid: -1,
  name: '',
  read_team: false,
  write_team: false,
  update_team: false,
  delete_team: false,
  read_member: false,
  write_member: false,
  update_member: false,
  delete_member: false,
  read_task: false,
  write_task: false,
  update_task: false,
  delete_task: false,
  users: [],
};

export const useRoleState = (): [
  RoleType,
  Dispatch<SetStateAction<RoleType>>,
] => {
  const navigate = useNavigate();
  const params = useParams<{ rid: string }>();
  const roles = useRecoilValue(rolesState);

  const [role, setRole] = useState<RoleType>(initRoleState);

  useEffect(() => {
    const rid = parseInt(params.rid as string, 10);

    if (rid && !isNaN(rid)) {
      const role = roles.find((role) => role.rid === rid) as RoleType;
      if (role) {
        setRole(role);
      }
    } else {
      navigate('/roles', { replace: true });
      return;
    }
  }, [params, navigate, roles, setRole]);

  return [role, setRole];
};
