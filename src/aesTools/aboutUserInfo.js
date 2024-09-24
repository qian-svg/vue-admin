/**
 * 签到加密方案
 * http://10.100.0.108:8090/pages/viewpage.action?pageId=27067670
 */
import { aesEncryption, aesDecrypt } from './index'
import CryptoJS from 'crypto-js'
const orgKey = 'w9f9xvt07g6rm68w'
const ivn = '1765874688934167'
export const aesEncryption4User = (data) => {
  const iv = CryptoJS.enc.Latin1.parse(ivn)
  const key = CryptoJS.enc.Latin1.parse(orgKey)
  return aesEncryption(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
}
export const aesDecrypt4User = (data) => {
  const iv = CryptoJS.enc.Latin1.parse(ivn)
  const key = CryptoJS.enc.Latin1.parse(orgKey)
  return aesDecrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
}
