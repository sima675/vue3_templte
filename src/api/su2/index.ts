import { del, get, post, put } from '/@/utils/http';
import type {
  Su2AlarmLog,
  Su2AlarmTask,
  Su2AlarmTone,
  Su2BusinessSetting,
  Su2CdrRecord,
  Su2ListResult,
  Su2LoginResult,
  Su2PageResult,
  Su2Prompt,
  Su2Queue,
  Su2SipExtension,
  Su2UserInfo,
} from './model';

export const su2LoginApi = {
  getLogoBanner: () => get<{ data: string; type: string }>({ url: '/webapi/portal/login/logo-banner' }),
  getLanguage: () => get<string>({ url: '/webapi/portal/login/language' }),
  getDeviceType: () => get<string>({ url: '/webapi/portal/login/device-type' }),
  getPublicKey: () => get<{ key: string }>({ url: '/webapi/portal/login/key' }),
  login: (data: { acc: string; passwd: string; clientType: 'portal' | string }) =>
    post<Su2LoginResult>({ url: '/webapi/portal/login/account', data }),
  logout: () => get({ url: '/webapi/portal/login/quit', params: { clientType: 'portal' } }),
  getSipAddress: (sipProfile: string) =>
    get<{ Prefix: string; Schema: string; Target: string; Port: string }>({
      url: '/webapi/portal/login/sip-addr',
      params: { sipProfile },
    }),
};

export const su2UserApi = {
  getUserInfo: () => get<Su2UserInfo>({ url: '/webapi/portal/user/user-info' }),
  updateBase: (data: Pick<Su2UserInfo, 'firstName' | 'lastName' | 'gender' | 'extensionNo' | 'officePhoneNumber' | 'phoneNumber' | 'photo'>) =>
    put({ url: '/webapi/portal/user/edit-base', data }),
  updateOther: (data: Su2UserInfo) => put({ url: '/webapi/portal/user/edit-other', data }),
  getPwdStrength: () => get<{ pwdStrength: number; dinlinkPwdStrength: number }>({ url: '/webapi/portal/user/pwd-strength' }),
  updateSipPwd: (data: { extension: string; password: string; old_sip_password: string }) =>
    post<{ sipPwd: string }>({ url: '/webapi/portal/user/edit-sipPwd', data }),
  updateAppPwd: (data: { extension?: string; dinlink_passwd: string; old_dinlink_passwd: string }) =>
    post({ url: '/webapi/portal/user/edit-linkPwd', data }),
  checkAppPwd: (data: { old_dinlink_passwd: string }) =>
    post<boolean>({ url: '/webapi/portal/user/check-linkPwd', data }),
  setFirstLoginQuestions: (data: Array<{ questionCode: string; questionAnswer: string }>) =>
    post({ url: '/webapi/portal/user/set-protectQuestions', data }),
  setFirstLoginUserInfo: (data: {
    firstName: string;
    lastName: string;
    gender: string;
    officeNumber: string | null;
    phoneNumber: string | null;
    photo: string | null;
  }) => post({ url: '/webapi/portal/user/set-userInfo', data }),
};

export const su2SecurityApi = {
  getQuestionList: () =>
    get<Array<{ id: number; question: string; code: string; type: number }>>({
      url: '/webapi/portal/security-question/list',
    }),
  getCurrentQuestions: (acc: string) =>
    get<Array<{ id: number; sipExtension: string; question: string; questionCode: string; questionAnswer?: string; type: number }>>({
      url: '/webapi/portal/security-question/sip-question',
      params: { acc },
    }),
  getForgetQuestions: (acc: string) =>
    get<Array<{ id: number; sipExtension: string; question: string; questionCode: string; type: number }>>({
      url: '/webapi/portal/security-question/sip-question/forget',
      params: { acc },
    }),
  verifySecurity: (data: { acc: string; protectQuestions: Array<{ questionCode: string; questionAnswer: string }> }) =>
    post<boolean>({ url: '/webapi/portal/security-question/verify-security', data }),
  updateQuestions: (data: Array<{ questionCode: string; questionAnswer: string }>) =>
    post({ url: '/webapi/portal/security-question/update-question', data }),
  resetPassword: (data: { acc: string; newPwd: string }) => put({ url: '/webapi/portal/user/forget-pwd', data }),
};

export const su2CallApi = {
  getQueues: () => get<Su2Queue[]>({ url: '/webapi/portal/queue/list' }),
  signInQueue: (data: { queue: string; status: string }) => post({ url: '/webapi/portal/queue/sign-in', data }),
  getSipList: (index: string) => post<Su2SipExtension[]>({ url: '/webapi/portal/queue/sip-list', data: { index } }),
  getCdrPage: (data: { cdrType?: number | null; condition?: string | null; pageNum: number; pageSize: number }) =>
    post<Su2PageResult<Su2CdrRecord>>({ url: '/webapi/portal/cdr/page', data }),
  addCdrRemark: (data: { uuid: string; remark: string }) => post({ url: '/webapi/portal/cdr/add-remark', data }),
  getMessagePage: (data: { pageNum: number; pageSize: number }) =>
    post<Su2PageResult<unknown>>({ url: '/webapi/portal/message/page', data }),
  getVoicemailPage: (data: { pageNum: number; pageSize: number }) =>
    post<Su2PageResult<unknown>>({ url: '/webapi/portal/voicemail/page', data }),
};

export const su2ServiceApi = {
  getBusiness: () => get<Su2BusinessSetting>({ url: '/webapi/portal/user/business' }),
  saveBusiness: (data: Partial<Su2BusinessSetting>) => put({ url: '/webapi/portal/user/business', data }),
  getPrompts: () => get<Su2Prompt[]>({ url: '/webapi/portal/prompt/list' }),
  createPrompt: (data: { name: string; describe: string; fileUrl: string }) => post({ url: '/webapi/portal/prompt', data }),
  deletePrompt: (id: number) => del({ url: '/webapi/portal/prompt', params: { id } }),
};

export const su2AlarmApi = {
  getTones: () => get<Su2AlarmTone[]>({ url: '/webapi/portal/alarm/tone' }),
  getTasks: (params: { pageSize: number; pageNum: number; status?: number }) =>
    get<Su2ListResult<Su2AlarmTask>>({ url: '/webapi/portal/alarm/list', params }),
  createTask: (data: Partial<Su2AlarmTask>) => post({ url: '/webapi/portal/alarm/add', data }),
  updateTask: (data: Partial<Su2AlarmTask> & { id: number }) => put({ url: '/webapi/portal/alarm/edit', data }),
  stopTask: (alarm_id: number) => put({ url: '/webapi/portal/alarm/stop', data: { alarm_id } }),
  getLogs: (params: { pageSize: number; pageNum: number; kw?: string }) =>
    get<Su2ListResult<Su2AlarmLog>>({ url: '/webapi/portal/alarm/logs', params }),
};
