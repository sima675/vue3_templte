// 接口返回 形状
export interface ResData<T> {
  code: number;
  message: string;
  result: T;
}

// SU2 接口文档中的返回形状
export interface Su2ResData<T> {
  status: boolean | number;
  data?: T;
  err?: string;
  cause?: unknown;
}
