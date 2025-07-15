export interface ResponseResult<T> {
  data: T | null;
  isSuccess: boolean;
  httpStatus: number | null;
  errorCode: string | null;
  errorMessage: string | null;
}
export interface Data<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  apiVersion?: string;
  [key: string]: any;
}
