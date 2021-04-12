// AES-256-EAX-Argon2
// spec: https://paranoiaworks.mobi/sse/pwv_specifications.html
// libs: https://pteo.paranoiaworks.mobi/
// lzma: https://www.npmjs.com/package/lzma
// argon2: https://antelle.net/argon2-browser/
// CryptoJS: https://cryptojs.gitbook.io/docs/
// EAX: https://github.com/artjomb/cryptojs-extension

import { DECRYPT_EXCEPTION } from "../constants";

const windowPath = ((pathName) => {
    const i = pathName.indexOf("index.html");
    return i > 0 ? pathName.substring(0, i) : pathName;
})(window.location.pathname);

const lzmaWorker = new LZMA(`${windowPath}js/lzma_worker-min.js`);
const argon2WasmModulePath = `${windowPath}js/argon2.js`;
window.argon2WasmPath = `${windowPath}wasm/argon2.wasm`;

window.loadArgon2WasmModule = () => {
    if (typeof require === 'function') {
        return Promise.resolve(require(argon2WasmModulePath));
    }

    return import(argon2WasmModulePath);
};

const lzmaCompress = (plainText) => {
    return new Promise((resolve, reject) => {
        lzmaWorker.compress(plainText, 1, (compressedByteArray, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(compressedByteArray);
            }
        });
    });
};

const lzmaDecompress = (compressedByteArray) => {
    return new Promise((resolve, reject) => {
        lzmaWorker.decompress(compressedByteArray, (plainText, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(plainText);
            }
        });
    });
};

const byteArrayToHexString = (byteArray) => {
    const hex = [];
    let byte;
    let hexString = "";

    for (let i = 0; i < byteArray.length; i++) {
        byte = byteArray[i] < 0 ? byteArray[i] + 256 : byteArray[i];
        hexString = hexString.concat((byte >>> 4).toString(16), (byte & 15).toString(16));
    }

    return hexString;
};

const hexStringToByteArray = (hexString) => {
    const byteArray = [];

    for (let i = 0; i < hexString.length; i += 2) {
        byteArray.push(parseInt(hexString.substr(i, 2), 16))
    }

    return byteArray;
};

const byteArrayToWords = (byteArray) => {
    const hexString = byteArrayToHexString(byteArray);
    return CryptoJS.enc.Hex.parse(hexString); // words
};

const wordsToByteArray = (words) => {
    const hexString = words.toString(CryptoJS.enc.Hex);
    return hexStringToByteArray(hexString); // byteArray
};

const base64EncodeUrl = (b64String) => b64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=+$/, ''); // b64UrlString

const base64DecodeUrl = (b64UrlString) => (b64UrlString + '===')
    .slice(0, b64UrlString.length + (b64UrlString.length % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/'); // b64String

const hkdfSha3Calc = (password, salt, info, length) => {
    const hashLength = 64; // CryptoJS.HmacSHA3 uses 512-bit output
    const iterations = Math.ceil(length / hashLength);
    const prk = CryptoJS.HmacSHA3(password, salt);
    const infoWords = CryptoJS.enc.Utf8.parse(info);
    let t = CryptoJS.lib.WordArray.create();
    let okm = CryptoJS.lib.WordArray.create();

    for(let i = 0; i < iterations; i++) {
        const iWords = CryptoJS.enc.Utf8.parse(String.fromCharCode(i + 1));
        t.concat(infoWords).concat(iWords);
        t = CryptoJS.HmacSHA3(t, prk);
        okm.concat(t);
    }

    okm.sigBytes = length;
    okm.clamp();

    return okm;
};

const argon2Calc = async (password, salt, time, mem, hashLen, parallelism, type) => {
    const argon2Result = await argon2.hash({
        pass: password,
        salt: salt,
        time: time,
        mem: mem,
        hashLen: hashLen,
        parallelism: parallelism,
        type: type === 'Argon2id'
            ? argon2.ArgonType.Argon2id
            : type === 'Argon2i'
                ? argon2.ArgonType.Argon2i
                : argon2.ArgonType.Argon2d
    });

    return argon2Result.hashHex; // argon2HexString
};

const aesEaxEncrypt = (keyWords, nonceWords, plainTextWords, associatedDataText, splitKey) => {
    const eax = CryptoJS.EAX.create(keyWords, {
        splitKey: splitKey
    });

    const cipherTextWords = eax.encrypt(plainTextWords, nonceWords, associatedDataText);
    return cipherTextWords.toString(CryptoJS.enc.Base64); // cipherText
};

const aesEaxDecrypt = (keyWords, nonceWords, cipherText, associatedDataText, splitKey) => {
    const eax = CryptoJS.EAX.create(keyWords, {
        splitKey: splitKey
    });

    const cipherTextWords = CryptoJS.enc.Base64.parse(cipherText);
    const plaintextWords = eax.decrypt(cipherTextWords, nonceWords, associatedDataText);

    if(!plaintextWords) {
        throw DECRYPT_EXCEPTION;
    }

    return plaintextWords;
};

const getAes256EaxArgon2Params = (associatedDataText) => {
    const params = {
        passwordSalt: "8B0C8A150D075585C5EDE6876884A940",
        passwordInfo: "A44D65EA5FB3154D5EF8DD4ACD6CF198",
        passwordLen: 256, // 2048-bit password for argon2
        time: 10,
        mem: 30720,
        hashLen: 32, // 256-bit argon2 output
        parallelism: 4,
        type: 'Argon2id',
        keySalt: "1AE9B477369C45DD673DFA96C9FEE330",
        keyInfo: "6B10F95F8776314854E621710B9ADBB0",
        keyLen: 64, // 512-bit key for AES-EAX (1st half CMAC, second half CTR)
        nonceSalt: "586FAD1A89B302B51BCC17949740220A",
        nonceInfo: "F6E8D0BCD6D07EA275CE78AB0832B556",
        nonceLen: 32, // 256-bit nonce for AES-EAX
        associatedDataText,
        splitKey: true
    };

    if(associatedDataText) {
        params.argon2Salt = CryptoJS.enc.Base64.parse(associatedDataText);
    } else {
        params.argon2Salt = CryptoJS.lib.WordArray.random(16); // 128-bit salt for argon2
        params.associatedDataText = params.argon2Salt.toString(CryptoJS.enc.Base64);
    }

    params.argon2Salt = params.argon2Salt.toString(CryptoJS.enc.Hex);

    return params;
};

const aes256EaxArgon2Encrypt = async (password, plainText) => {
    const {
        passwordSalt, passwordInfo, passwordLen, argon2Salt, time, mem, hashLen, parallelism, type,
        keySalt, keyInfo, keyLen, nonceSalt, nonceInfo, nonceLen, associatedDataText, splitKey
    } = getAes256EaxArgon2Params();

    const argon2Password = hkdfSha3Calc(password, passwordSalt, passwordInfo, passwordLen).toString(CryptoJS.enc.Hex);
    const argon2HexString = await argon2Calc(argon2Password, argon2Salt, time, mem, hashLen, parallelism, type);

    const keyWords = hkdfSha3Calc(argon2HexString, keySalt, keyInfo, keyLen);
    const nonceWords = hkdfSha3Calc(argon2HexString, nonceSalt, nonceInfo, nonceLen);

    const plainTextCompressed = await lzmaCompress(plainText);
    const plainTextCompressedWords = byteArrayToWords(plainTextCompressed);

    const cipherText = aesEaxEncrypt(keyWords, nonceWords, plainTextCompressedWords, associatedDataText, splitKey);

    return `${base64EncodeUrl(associatedDataText)}.${base64EncodeUrl(cipherText)}`; // cipherTextWithAssociatedData
};

const aes256EaxArgon2Decrypt = async (password, cipherTextWithAssociatedData) => {
    const [associatedDataText, cipherText] = cipherTextWithAssociatedData.split('.').map(base64DecodeUrl);

    const {
        passwordSalt, passwordInfo, passwordLen, argon2Salt, time, mem, hashLen, parallelism, type,
        keySalt, keyInfo, keyLen, nonceSalt, nonceInfo, nonceLen, splitKey
    } = getAes256EaxArgon2Params(associatedDataText);

    const argon2Password = hkdfSha3Calc(password, passwordSalt, passwordInfo, passwordLen).toString(CryptoJS.enc.Hex);
    const argon2HexString = await argon2Calc(argon2Password, argon2Salt, time, mem, hashLen, parallelism, type);

    const keyWords = hkdfSha3Calc(argon2HexString, keySalt, keyInfo, keyLen);
    const nonceWords = hkdfSha3Calc(argon2HexString, nonceSalt, nonceInfo, nonceLen);

    const plainTextCompressedWords = aesEaxDecrypt(keyWords, nonceWords, cipherText, associatedDataText, splitKey);
    const plainTextCompressed = wordsToByteArray(plainTextCompressedWords);

    return await lzmaDecompress(plainTextCompressed); // plainText
};

export {
    aes256EaxArgon2Encrypt,
    aes256EaxArgon2Decrypt
};
