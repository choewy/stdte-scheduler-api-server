import { AppError } from './enums';

export type ErrorDataType = {
  status: number;
  message: string;
  error: string;
  name?: string;
  details?: any;
};

export type AppErrorKey = AppError;
export type AppErrorType = (details?: any) => ErrorDataType;
export type AppErrorMapType = Record<AppErrorKey, AppErrorType>;

export type ValidationErrorType = ErrorDataType;
