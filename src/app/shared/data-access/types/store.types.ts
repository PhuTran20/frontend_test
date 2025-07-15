import { ErrorInfo } from '../constants/operation.constants';

export interface BaseState {
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  lastError: ErrorInfo;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  searchContent: string;
  isOpenModal: boolean;
  selectedItem: any | null;
  isEdit: boolean;
}

export interface PaginationInfo {
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface LoadParams {
  page?: number;
  pageSize?: number;
  content?: string;
}
