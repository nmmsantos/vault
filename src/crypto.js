// AES-256-EAX-Argon2
// spec: https://paranoiaworks.mobi/sse/pwv_specifications.html
// libs: https://pteo.paranoiaworks.mobi/
// lzma: https://www.npmjs.com/package/lzma
// argon2: https://antelle.net/argon2-browser/
// jsDigest: http://coiscir.github.io/jsdigest
// sjcl: http://bitwiseshiftleft.github.io/sjcl/doc/
// CryptoJS: https://cryptojs.gitbook.io/docs/
// EAX: https://github.com/artjomb/cryptojs-extension

import { DECRYPT_EXCEPTION } from "./constants";

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
}

function hexStringToByteArray(hexString) {
    const byteArray = [];

    for (let i = 0; i < hexString.length; i += 2) {
        byteArray.push(parseInt(hexString.substr(i, 2), 16))
    }

    return byteArray;
}

const byteArrayToWords = (byteArray) => {
    const hexString = byteArrayToHexString(byteArray);
    const words = CryptoJS.enc.Hex.parse(hexString);

    return words;
}

const wordsToByteArray = (words) => {
    const hexString = words.toString(CryptoJS.enc.Hex);
    const byteArray = hexStringToByteArray(hexString);

    return byteArray;
}

const argon2DerivateKeyNonce = async (password, saltHexString, time, mem, hashLen, parallelism, type) => {
    const skeinHash = Digest.skein1024(password).hex();

    const argon2Hash = await argon2.hash({
        pass: skeinHash,
        salt: saltHexString,
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

    const keyWords = CryptoJS.HmacSHA3(argon2Hash.hashHex, 'keysalt');
    const nonceWords = CryptoJS.HmacSHA3(argon2Hash.hashHex, 'noncesalt');

    return [keyWords, nonceWords];
}

const aesEaxEncrypt = (plainTextWords, keyWords, nonceWords, associatedDataText, splitKey) => {
    const eax = CryptoJS.EAX.create(keyWords, {
        splitKey: splitKey
    });

    const cipherTextWords = eax.encrypt(plainTextWords, nonceWords, associatedDataText);
    const cipherText = cipherTextWords.toString(CryptoJS.enc.Base64);

    return cipherText;
}

const aesEaxDecrypt = (cipherText, keyWords, nonceWords, associatedDataText, splitKey) => {
    const eax = CryptoJS.EAX.create(keyWords, {
        splitKey: splitKey
    });

    const cipherTextWords = CryptoJS.enc.Base64.parse(cipherText);
    const plaintextWords = eax.decrypt(cipherTextWords, nonceWords, associatedDataText);

    if(!plaintextWords) {
        throw DECRYPT_EXCEPTION;
    }

    return plaintextWords;
}

const aes256EaxArgon2Encrypt = async (plainText, password) => {
    const saltHexString = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex); // 128-bit salt for argon2
    const time = 10;
    const mem = 10240;
    const hashLen = 32;
    const parallelism = 4;
    const type = 'Argon2id';
    const splitKey = true;

    const associatedDataText = btoa(JSON.stringify([saltHexString, time, mem, hashLen, parallelism, type, splitKey]));

    const [keyWords, nonceWords] = await argon2DerivateKeyNonce(password, saltHexString, time, mem, hashLen, parallelism, type);

    const plainTextCompressed = await lzmaCompress(plainText);
    const plainTextCompressedWords = byteArrayToWords(plainTextCompressed);

    const cipherText = aesEaxEncrypt(plainTextCompressedWords, keyWords, nonceWords, associatedDataText, splitKey);

    const cipherTextWithAssociatedData = `${associatedDataText}.${cipherText}`;

    return cipherTextWithAssociatedData;
}

const aes256EaxArgon2Decrypt = async (cipherTextWithAssociatedData, password) => {
    const [associatedDataText, cipherText] = cipherTextWithAssociatedData.split('.');

    const [saltHexString, time, mem, hashLen, parallelism, type, splitKey] = JSON.parse(atob(associatedDataText));

    const [keyWords, nonceWords] = await argon2DerivateKeyNonce(password, saltHexString, time, mem, hashLen, parallelism, type);

    const plainTextCompressedWords = aesEaxDecrypt(cipherText, keyWords, nonceWords, associatedDataText, splitKey);
    const plainTextCompressed = wordsToByteArray(plainTextCompressedWords);
    const plainText = await lzmaDecompress(plainTextCompressed);

    return plainText;
}

export {
    aes256EaxArgon2Encrypt,
    aes256EaxArgon2Decrypt
};
