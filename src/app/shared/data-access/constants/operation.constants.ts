export type OperationType =
  | 'load'
  | 'create'
  | 'update'
  | 'delete'
  | 'loadPriority';

export type ErrorInfo = {
  operation: OperationType;
  message: string;
  timestamp: number;
} | null;
