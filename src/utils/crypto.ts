import CryptoJS from 'crypto-js'
import keyConfig from '../config/encrypt/keyexport.js'
const key = CryptoJS.enc.Utf8.parse(keyConfig.key)
const iv = CryptoJS.enc.Utf8.parse(keyConfig.iv)
const key2 = CryptoJS.enc.Utf8.parse("4Trws28UnbSq920P")
const iv2 = CryptoJS.enc.Utf8.parse("26vFzkPolQj70Ghs")
// "key":"2Ytc7TQ138pLknzD",
// "iv":"iKB5rWsZf2u9wQiJ"

/**AES解密数据 */
function dataDecrypt(word: any) {
    let decrypt = CryptoJS.AES.decrypt(word, key, { iv , mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

/**AES加密数据（注：无需提前将其转为string，如果类型传入object的对象可以自动将其stringify再加密） */
function dataEncrypt(word: any | object, isCert?: boolean) {
    let data = typeof word == 'object' ? JSON.stringify(word) : word
    let srcs = CryptoJS.enc.Utf8.parse(data);
    let encrypted = CryptoJS.AES.encrypt(srcs, isCert ? key2 : key, { iv: isCert ? iv2 : iv , mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString().replace(/=/g,'');
}

export {dataDecrypt, dataEncrypt}