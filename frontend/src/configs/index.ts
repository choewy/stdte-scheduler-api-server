declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
    }
  }
}

export * from './api.config';
export * from './auth.config';
export * from './router.config';
