export interface NoticeEventData {
  message: string;
  type?: 'error' | 'success' | 'info' | undefined;
  duration?: number;
}
