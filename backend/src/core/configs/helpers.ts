import { NodeEnvs } from './enums';

export const isLocal = () => process.env.NODE_ENV === NodeEnvs.Local;
export const isDevelop = () => process.env.NODE_ENV === NodeEnvs.Develop;
export const isStaging = () => process.env.NODE_ENV === NodeEnvs.Staging;
export const isProduct = () => process.env.NODE_ENV === NodeEnvs.Product;
