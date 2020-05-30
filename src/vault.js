import { DECRYPT_EXCEPTION } from "./constants";
import { aes256EaxArgon2Encrypt, aes256EaxArgon2Decrypt } from "./crypto";

const databaseDump = (database) => jsyaml.safeDump(database, { sortKeys: true });
const databaseLoad = (text) => jsyaml.safeLoad(text);

const defaultConfig = {
    apiKey: '',
    clientId: '',
    masterPassword: ''
};

const defaultConfigText = databaseDump(defaultConfig);

const getDefaultConfigText = () => defaultConfigText;

const generateConfig = async (configText) => {
    const config = databaseLoad(configText);
    const masterPassword = config['masterPassword'];
    delete config['masterPassword'];
    const newConfigText = databaseDump(config);
    const configCipherText = await aes256EaxArgon2Encrypt(newConfigText, masterPassword);
    return configCipherText;
}

let config;
let secrets;

const save = async (password, secrets) => {
    const plainText = JSON.stringify(secrets);
    const database = await aes256EaxArgon2Encrypt(plainText, password);

    return database;
}

const load = async (password, database) => {
    let plainText;

    try {
        plainText = await aes256EaxArgon2Decrypt(database, password);
    } catch (error) {
        if(error === DECRYPT_EXCEPTION) {
            throw SECRETS_LOAD_EXCEPTION;
        }
    }

    const secrets = JSON.parse(plainText);

    return secrets;
}

export {
    getDefaultConfigText,
    generateConfig,
    save,
    load
};
