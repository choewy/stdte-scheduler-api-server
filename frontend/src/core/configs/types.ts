declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
    }
  }
}

export type ApiConfig = {
  baseURL: string;
  withCredentials: boolean;
};

export type SocketConfig = {
  uri: string;
  path: string;
};
