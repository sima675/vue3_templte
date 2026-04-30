import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ReqParams } from '/@/api/user/model';
import fetchApi from '/@/api/user';
import { getLoginPublicKeyApi, loginByAccountApi, logoutByAccountApi } from '/@/api/extensionUser';
// import { encryptByDES } from '/@/utils/crypto';
import { encryptBySu2PublicKey } from '/@/utils/su2Crypto';
import { getToken, setToken, removeToken, setAccountType, removeAccountType, clearFirstLoginPending, getAccountType } from '/@/utils/auth';
import { router } from '/@/router';

interface UserState {
  token: string;
  auths: string[];
  accountType: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: '',
    // auths
    auths: [],
    accountType: getAccountType(),
  }),
  getters: {
    getToken(): string {
      return this.token || getToken();
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? ''; // for null or undefined value
      setToken(info);
    },
    setAuth(auths: string[]) {
      this.auths = auths;
    },
    resetState() {
      this.token = '';
      this.auths = [];
      this.accountType = '';
    },
    /**
     * @description: login
     */
    async login(params: ReqParams) {
      if (params.loginType === 'personal') {
        const { key } = await getLoginPublicKeyApi();
        const res = await loginByAccountApi({
          acc: params.username,
          passwd: encryptBySu2PublicKey(params.password, key),
          clientType: 'portal',
        });

        if (res) {
          this.setToken(res.token);
          this.accountType = 'personal';
          setAccountType(this.accountType);
        }
        return res;
      }

      // 密码加密
      // params.password = encryptByDES(params.password);
      const res = await fetchApi.login(params);
      if (res) {
        // save token
        this.setToken(res.token);
        this.accountType = res.account_type || '';
        setAccountType(this.accountType);
      }
      return res;
    },

    /**
     * @description: logout
     */
    async logout() {
      try {
        if (this.accountType === 'personal') {
          await logoutByAccountApi();
        }
      } catch {
        // 退出时接口失败也继续清理本地登录态，避免用户被卡在当前页面。
      }
      this.resetState();
      removeToken();
      removeAccountType();
      clearFirstLoginPending();
      router.replace('/login');
      // 路由表重置
      location.reload();
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
