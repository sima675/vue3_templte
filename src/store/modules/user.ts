import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ReqParams } from '/@/api/user/model';
import fetchApi from '/@/api/user';
// import { encryptByDES } from '/@/utils/crypto';
import { getToken, setToken, removeToken, setAccountType, removeAccountType } from '/@/utils/auth';
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
    accountType: '',
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
      this.resetState();
      removeToken();
      removeAccountType();
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
