import { getDefaultConfigText, generateConfig } from "../vault";

CodeFlask.prototype.setWordWrap = function() {
    const style = {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
    };

    Object.assign(this.elTextarea.style, style);
    Object.assign(this.elPre.style, style, { width: '100%' });
};

const init = (page) => {
    const elemGenerate = page.querySelector('#generate');

    const configEditor = new CodeFlask('#config_editor', {
        language: 'yaml'
    });

    configEditor.addLanguage('yaml', Prism.languages['yaml']);
    configEditor.setWordWrap();

    configEditor.updateCode(getDefaultConfigText());

    elemGenerate.onclick = async () => {
        const configText = configEditor.getCode();
        const configCipherText = await generateConfig(configText);
        configEditor.updateCode(configCipherText);
    };
};

export {
    init
};
