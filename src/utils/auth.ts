const TokenKey = 'x-auth-token';
const AccountTypeKey = 'x-account-type';
/** 个人账户首次登录未完成向导时占位，需在完成后 clear */
const FirstLoginPendingKey = 'portal-first-login-pending';
const FirstLoginAccKey = 'portal-first-login-acc';

export function setFirstLoginPending(acc: string) {
  sessionStorage.setItem(FirstLoginPendingKey, '1');
  sessionStorage.setItem(FirstLoginAccKey, acc);
}

export function clearFirstLoginPending() {
  sessionStorage.removeItem(FirstLoginPendingKey);
  sessionStorage.removeItem(FirstLoginAccKey);
}

export function isFirstLoginPending() {
  return sessionStorage.getItem(FirstLoginPendingKey) === '1';
}

export function getFirstLoginAcc() {
  return sessionStorage.getItem(FirstLoginAccKey) || '';
}

export function getToken() {
  return localStorage.getItem(TokenKey) || '';
}

export function setToken(token: string) {
  localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  localStorage.setItem(TokenKey, '');
}

export function getAccountType() {
  return localStorage.getItem(AccountTypeKey) || '';
}

export function setAccountType(type: string) {
  localStorage.setItem(AccountTypeKey, type);
}

export function removeAccountType() {
  localStorage.setItem(AccountTypeKey, '');
}
