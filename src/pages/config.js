import { CodeEditor } from "../lib/code-editor";
import { generateConfig, getDefaultConfigText } from "../lib/vault";

const init = (page) => {
    const elGenerate = page.querySelector('#generate');
    const elConfigEditor = page.querySelector('#configEditor');

    const configEditor = new CodeEditor(elConfigEditor);

    configEditor.setWordWrap();

    let configText = getDefaultConfigText();

    elGenerate.onclick = async () => {
        if(configText !== null) {
            configEditor.updateCode(configText);
            configText = null;
            configEditor.updateLanguage('yaml');
            elGenerate.innerHTML = 'Generate';
        } else {
            configText = configEditor.getCode();
            const configCipherText = await generateConfig(configText);
            configEditor.updateCode(`<input id="config" type="hidden" value="${configCipherText}">`);
            configEditor.updateLanguage('html');
            elGenerate.innerHTML = 'New Config';
        }
    };

    elGenerate.onclick();

    const pHeader = { "alg": "RS256", "typ": "JWT" }
    const sHeader = JSON.stringify(pHeader);

    const pClaim = {};
    pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
    pClaim.scope = "https://www.googleapis.com/auth/drive";
    pClaim.iss = "bbb-service@bbb-service-199412.iam.gserviceaccount.com";
    pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
    pClaim.iat = KJUR.jws.IntDate.get("now");

    const sClaim = JSON.stringify(pClaim);

    const key = "-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n";
    console.log(sHeader);
    const sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);
    console.log(sJWS);

};

export {
    init
};
