import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from './_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Admin User',
      avatar: '',
      desc: 'super admin',
      password: '123456',
      token: 'fakeToken1',
      auths: [],
      modules: [],
      is_admin: 1,
      account_type: 'admin',
      role_name: '系统管理员',
      mobile: 13000000000,
      last_login: '2021-11-11 12:00',
      role: 1, // 管理
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'Demo User',
      avatar: '',
      desc: 'editor',
      token: 'fakeToken2',
      auths: [],
      modules: ['home', 'website'],
      is_admin: 0,
      account_type: 'admin',
      role_name: '普通成员',
      mobile: 18000000000,
      last_login: '2021-11-11 12:12',
      role: 0, // 普通
    },
    {
      userId: '1001',
      username: '1001',
      password: '123456',
      realName: 'Extension 1001',
      avatar: '',
      desc: 'personal portal user',
      token: 'fakePersonalToken1001',
      auths: [],
      modules: ['home', 'website'],
      is_admin: 0,
      account_type: 'personal',
      role_name: '分机用户',
      mobile: 1001,
      last_login: '2026-04-20 15:05',
      role: 0,
    },
  ];
}

export default [
  // mock user login
  {
    url: '/v1/user/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password, loginType } = body;
      const checkUser = createFakeUserList().find(
        (item) =>
          item.username === username &&
          password === item.password &&
          (!loginType || item.account_type === loginType),
      );
      if (!checkUser) {
        return resultError('账号、密码或登录类型不正确');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/v1/user/permission',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/v1/user/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/v1/account/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
] as MockMethod[];
