export interface ReqParams {
  username: string;
  password: string;
  loginType?: 'admin' | 'personal';
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
  account_type?: 'admin' | 'personal';
}

export interface ResResult {
  login_status: number;
  st: string;
  token: string;
  account_type?: 'admin' | 'personal';
}
