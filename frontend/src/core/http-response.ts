export interface HttpResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}