import { del, get, post, put } from '/@/utils/http';

/* 登录 */
// 获取登录加密公钥
export const getLoginPublicKeyApi = () => get('/webapi/portal/login/key');

// 账号密码登录
export const loginByAccountApi = (payload: any) =>
  post('/webapi/portal/login/account', payload);

// 退出登录
export const logoutByAccountApi = () =>
  get('/webapi/portal/login/quit', { clientType: 'portal' });

/* 通讯录 */
// 获取个人通讯录分组
export const getAddressBookGroupsApi = () =>
  get('/webapi/portal/account/address-book/group/list');

// 保存个人通讯录分组
export const saveAddressBookGroupsApi = (groups: string[]) =>
  post('/webapi/portal/account/address-book/group/edit', { groups });

// 获取外部联系人分组
export const getExternalAddressBookGroupsApi = () =>
  get('/webapi/portal/account/address-book/group-external/list');

// 获取个人通讯录联系人
export const getAddressBookContactsApi = (payload: any) =>
  post('/webapi/portal/account/address-book/contacts/list', payload);

// 导入个人通讯录联系人
export const importAddressBookContactsApi = (payload: any) =>
  post('/webapi/portal/account/address-book/contacts/import', payload);

// 导出个人通讯录联系人
export const exportAddressBookContactsApi = (payload: any) =>
  post('/webapi/portal/account/address-book/contacts/export', payload);

// 获取公共通讯录联系人
export const getPublicContactsApi = (payload: any) =>
  post('/webapi/portal/public-contacts/contacts/list', payload);

// 获取外部公共通讯录联系人
export const getExternalPublicContactsApi = (payload: any) =>
  post('/webapi/portal/public-contacts/contacts-external/list', payload);

// 获取常用联系人
export const getFrequentContactsApi = () =>
  get('/webapi/portal/frequent-contacts/list');

// 新增个人联系人
export const addAddressBookContactApi = (payload: any) =>
  post('/webapi/portal/account/address-book/contacts', payload);

// 编辑个人联系人
export const editAddressBookContactApi = (payload: any) =>
  put('/webapi/portal/account/address-book/batchContacts', payload);

// 修改联系人分组
export const changeAddressBookContactGroupsApi = (payload: any) =>
  put('/webapi/portal/account/address-book/contacts', payload);

// 删除个人联系人
export const deleteAddressBookContactsApi = (id: string[]) =>
  del('/webapi/portal/account/address-book/contacts', { id });

// 添加常用联系人
export const addFrequentContactApi = (payload: any) =>
  post('/webapi/portal/frequent-contacts/prompt/add', payload);

// 删除常用联系人
export const deleteFrequentContactApi = (id: number) =>
  del('/webapi/portal/frequent-contacts/prompt/del', { id });

// 呼叫前联系人显示查询
export const getCallContactShowApi = (payload: any) =>
  post('/webapi/portal/public-contacts/contacts/list-call-show', payload);

/* 个人设置 */
// 获取用户信息
export const getUserInfoApi = () => get('/webapi/portal/user/user-info');

// 编辑基础信息
export const editUserBaseInfoApi = (payload: any) =>
  put('/webapi/portal/user/edit-base', payload);

// 编辑其他信息
export const editUserOtherInfoApi = (payload: any) =>
  put('/webapi/portal/user/edit-other', payload);

// 获取密码强度
export const getPasswordStrengthApi = () =>
  get('/webapi/portal/user/pwd-strength');

// 修改 SIP 注册密码
export const editSipPasswordApi = (payload: any) =>
  post('/webapi/portal/user/edit-sipPwd', payload);

// 修改应用密码
export const editAppPasswordApi = (payload: any) =>
  post('/webapi/portal/user/edit-linkPwd', payload);

// 校验应用密码
export const checkAppPasswordApi = (payload: any) =>
  post('/webapi/portal/user/check-linkPwd', payload);

// 获取密保问题列表
export const getSecurityQuestionsApi = () =>
  get('/webapi/portal/security-question/list');

// 获取当前密保问题
export const getCurrentSecurityQuestionsApi = (acc: string) =>
  get('/webapi/portal/security-question/sip-question', { acc });

// 获取忘记密码密保问题
export const getForgetSecurityQuestionsApi = (acc: string) =>
  get('/webapi/portal/security-question/sip-question/forget', { acc });

// 校验密保问题
export const verifySecurityQuestionsApi = (payload: any) =>
  post('/webapi/portal/security-question/verify-security', payload);

// 修改密保问题
export const updateSecurityQuestionsApi = (payload: any) =>
  post('/webapi/portal/security-question/update-question', payload);

// 首次设置密保问题
export const setProtectQuestionsApi = (payload: any) =>
  post('/webapi/portal/user/set-protectQuestions', payload);

// 首次设置用户信息
export const setUserInfoApi = (payload: any) =>
  post('/webapi/portal/user/set-userInfo', payload);

// 忘记密码重置
export const resetPasswordApi = (payload: any) =>
  put('/webapi/portal/user/forget-pwd', payload);

// 获取业务设置
export const getBusinessSettingApi = () =>
  get('/webapi/portal/user/business');

// 保存业务设置
export const saveBusinessSettingApi = (payload: any) =>
  put('/webapi/portal/user/business', payload);

// 获取提示语列表
export const getPromptListApi = () => get('/webapi/portal/prompt/list');

// 新建提示语
export const addPromptApi = (payload: any) =>
  post('/webapi/portal/prompt', payload);

// 删除提示语
export const deletePromptApi = (id: number) =>
  del('/webapi/portal/prompt', { id });

// 获取通话记录
export const getCallRecordPageApi = (payload: any) =>
  post('/webapi/portal/cdr/page', payload);

// 添加通话备注
export const addCallRecordRemarkApi = (payload: any) =>
  post('/webapi/portal/cdr/add-remark', payload);

// 获取语音留言
export const getMessagePageApi = (payload: any) =>
  post('/webapi/portal/message/page', payload);

// 获取语音邮箱
export const getVoicemailPageApi = (payload: any) =>
  post('/webapi/portal/voicemail/page', payload);

/* 文件 */
// 上传文件
export const uploadFileApi = (file: File, fileType = 'photo') => {
  const formData = new FormData();
  formData.append('file', file);
  return post(`/webapi/portal/file/upload-file?fileType=${fileType}`, formData);
};

// 获取文件下载地址
export const getFileDownloadUrl = (fileName: string, fileType = 'photo') =>
  `/api/webapi/portal/file/download-file?fileName=${encodeURIComponent(fileName)}&fileType=${fileType}`;
