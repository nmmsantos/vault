const init = (page) => {
    const secrets = page.data.secrets;

    const flask = new CodeFlask('#editor', {
        language: 'yaml'
    });

    flask.addLanguage('yaml', Prism.languages['yaml']);



    const objectFieldComparer = (field) => (a, b) => a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    secrets.sort(objectFieldComparer('name'));

    for(const secret of secrets) {
        secret.fields.sort(objectFieldComparer('name'));
    }

    flask.updateCode(jsyaml.safeDump(secrets));
    //const code = flask.getCode();

    //console.log(code);
};

export {
    init
};
