declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
    }
  }
}

export interface ApiConfig {
  baseURL: string;
  withCredentials: boolean;
}

export interface SocketConfig {
  uri: string;
  path: string;
}
