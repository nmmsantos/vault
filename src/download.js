const DB_INPUT_REGEX = /(<input id="secrets-db" type="hidden" value=")[a-zA-Z0-9+/]+={0,2}\.[a-zA-Z0-9+/]+={0,2}(">)/g

let APP_SOURCE;

document.onreadystatechange = () => {
    if(document.readyState === 'interactive') {
        APP_SOURCE = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    }
};

const downloadWithUpdatedDb = (ciphertext) => {
    const newSource = APP_SOURCE.replace(DB_INPUT_REGEX, `$1${ciphertext}$2`);
    download(newSource, 'vault.html', 'text/html');
}

export { downloadWithUpdatedDb }
