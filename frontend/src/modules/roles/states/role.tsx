import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RoutePath } from '@/app';
import { initRoleState } from './init';
import { rolesState } from './roles';
import { RoleType } from './types';

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
      navigate(RoutePath.Roles, { replace: true });
      return;
    }
  }, [params, navigate, roles, setRole]);

  return [role, setRole];
};
