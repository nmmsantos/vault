import { getDefaultConfigText, generateConfig } from "../lib/vault";
import { CodeEditor } from "../lib/code-editor";

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

    const key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChqqvmZspZaHNy\nfZkhdaW/KKxCFaruMCN2MnXYaaZABqH1rRmmUtmtn+pHTrWPUAC6IUuwlYS4yBet\n+SrBQB+WNdkhtTXSYPQdmiXkk+S3znUhWNendstQkthH22HmSLPtsz0cqL0fIzhP\nkyWg6KpXJWjGy+DyeI0ljv2hPsqT2tP9yolBU5p5Du9+hfZ7f8tVD1KQYEJJ/DMr\nWHCdfiF/7KtK2qi3/b+LQ82E9rVOn6+KAeXajOKW+y7r1I4F2YVOzCjVS8YYXjvj\ndJ9ZQrll7q7BT/fqUzVF9ptjWxTl+O6/P2YH4f2pDfo+ws/mp865maw0kh3oyOpz\nPqlRkuRFAgMBAAECggEABmDvVjB/rJY3cxcx8vHRlicRRnluYuZMiX3yMmJXKFDB\nFF1xFQpRAzQh3UOYwrMB/e+qxqipMbuk9SNPCyYjJbaxy4FH3ClUWG3b/H0G82c8\n+qtAgjk1faD3OAnK5UTz4t2ryQHk/GG6Xg4zPnpC0xw4JxsL1BiEXfmaiw5cL25m\npjY+eYnBR3b/vsub0RRtjrlrOoUteil6omxa2Fuh62/KkJCMW2In9j+w5JIV0L4m\nzm0YALwrg9Bj6xTls/hu/nJedzIgL5W9P+bu4utCnjK9vc9wpohBIJJ4OH7PoXut\nTBWJrnb/iux6msmUVqHGZnISK5nH/iDKY56ziyG3nQKBgQDM+xr1Xpw2aCOlVR3w\nxdaovgmj7qJcq+rev6Oji+Uy6pItF3NSzHXM+5R6/hV/n1PH0jxyeIykKJbrVAOM\nVaGyAntSDKCjTHzUcxrnxBnAYONiyHIb2ytQ29p6BLkMFzo/ae2E6IIf0/hHz3EX\nRJrNXhxnwN3IUQniAS1cUzHTWwKBgQDJ57BIK6NzOzSCwIIUGIUYOB741IJvu0cW\nnQe9BOrbyTMrTPmCot87uTN/AytYDjkem14W6XBPOTyhV04WaafR+7tLfb6U717M\nAFI70x71vzEzZ5KhtcQmyHCFRDI6hGc/gRNLJ1iea1QTVOgxMmKFL81wFcahb/0T\ndB4stzXY3wKBgHDveK7v7YlcXydceh6KIfbenVkgxXvhjIolc/dLwIAJFXiajwNz\newPxKKGLFDU4h2R0xLEdEf/wDRajN0E+fNQi4ecW5fqSzcQPlydSuA1yVFW8soH+\ngyMNvpWzvHCY65K8vgyYPfljREvsUxbKya+UxnmznX4ciCFpHKDdhXo5AoGBAKkR\nJ13nnMC7DOeIB+SH+7siE11NpcOl0IsxBu/SlE9ilURm+m/XrpI2LNbocn0Tu+TT\nOOB6rR7J0OlRUAQYiPyejGFUdCgGoRy2ECYkTUJ+zNY8nl5m9E99fCs7xcuWX1af\n4OYHln9hZE+jw6KejDz2oFKBCYjZW9PUYggTijWFAoGAIs2KK9j8RFrdbhTatMLD\nepoZbAQmMaIevFD28NT8qma7FpMmUVhINrpbCkfBjFDvVBel/Fe1OsF8tUGTME4m\n22qp0GOdty4LrzQ7ooM68yooSuyePLZQs7RGrqsYpjKdw6IcUBb93Z8xtdPJbYaO\nEqAX30nlslMNTI+DF084Ddo=\n-----END PRIVATE KEY-----\n";
    console.log(sHeader);
    const sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);
    console.log(sJWS);

};

export {
    init
};
