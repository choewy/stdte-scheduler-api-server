import { RolePolicyType } from '../states';

export type RolePolicyKeyType = keyof RolePolicyType;
export type RolePolicyLabelType = Record<RolePolicyKeyType, string>;
