const TokenKey = 'x-auth-token';
const AccountTypeKey = 'x-account-type';

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
