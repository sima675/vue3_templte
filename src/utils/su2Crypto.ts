import { J as JSEncrypt } from '../vendor/jsencrypt-a7f5f4fb.js';

export function encryptBySu2PublicKey(text: string, publicKey: string): string {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);

  const encrypted = encryptor.encrypt(text);
  if (!encrypted) {
    throw new Error('SU2 密码加密失败');
  }

  return encrypted;
}
