import { TAB_SIZE } from "../constants";

class CodeEditor extends CodeFlask {
    constructor(selectorOrElement, opts) {
        super(selectorOrElement, {
            language: 'yaml',
            tabSize: TAB_SIZE,
            ...opts
        });

        this.addLanguage('yaml', Prism.languages['yaml']);
    }

    setWordWrap() {
        const style = {
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
        };

        Object.assign(this.elTextarea.style, style);
        Object.assign(this.elPre.style, style, { width: '100%' });
    };
}

export {
    CodeEditor
}
