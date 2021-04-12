import { DECRYPT_EXCEPTION, SECRETS_LOAD_EXCEPTION } from "../constants";
import { aes256EaxArgon2Encrypt, aes256EaxArgon2Decrypt } from "./crypto";

const databaseDump = (database) => jsyaml.safeDump(database, { sortKeys: true });
const databaseLoad = (text) => jsyaml.safeLoad(text);

const defaultConfigText = [
    '# 1- Go to https://console.cloud.google.com and create a new project',
    '# 2- Enable the "Google Drive API" (all other APIs can be disabled)',
    databaseDump({
        apiKey: '',
        clientId: '',
        masterPassword: ''
    })
].join('\n');

const getDefaultConfigText = () => defaultConfigText;

const generateConfig = async (configText) => {
    const config = databaseLoad(configText);
    const masterPassword = config['masterPassword'];
    delete config['masterPassword'];
    const newConfigText = databaseDump(config);
    const configCipherText = await aes256EaxArgon2Encrypt(masterPassword, newConfigText);
    return configCipherText;
}

let config;
let secrets;

const save = async (password, secrets) => {
    const plainText = JSON.stringify(secrets);
    const database = await aes256EaxArgon2Encrypt(password, plainText);

    return database;
}

const load = async (password, database) => {
    let plainText;

    try {
        plainText = await aes256EaxArgon2Decrypt(password, database);
    } catch (error) {
        if(error === DECRYPT_EXCEPTION) {
            throw SECRETS_LOAD_EXCEPTION;
        }
    }

    const secrets = databaseLoad(plainText);

    return secrets;
}

export {
    getDefaultConfigText,
    generateConfig,
    save,
    load
};
