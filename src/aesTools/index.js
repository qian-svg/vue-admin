/**
 所用的工具文档 https://www.npmjs.com/package/crypto-js
 */
import CryptoJS from "crypto-js";

export const aesEncryption = (data, key, obj = {}) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), key, obj).toString();
}
export const aesDecrypt = (str, key, obj = {}) => {
	let bytes = CryptoJS.AES.decrypt(str.toString(), key, obj)
	return bytes.toString(CryptoJS.enc.Utf8)
}