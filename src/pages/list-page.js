const init = (page) => {
    const elemNavigator = document.getElementById('navigator');
    const elemSecretsList = page.querySelector('#secrets-list');
    const elemEdit = page.querySelector('#edit');
    // const secrets = page.data.secrets;
    const secrets = [
        {
            name: 'lol',
            fields: [
                {
                    name: 'asd',
                    value: 'asd\nasd'
                },
                {
                    name: 'pino',
                    value: 'asd\nasd'
                },
                {
                    name: '123',
                    value: 'asd\nasd'
                },
                {
                    name: 'piassa',
                    value: 'asd\nasd'
                },
                {
                    name: 'aragon aes',
                    value: 'asd\nasd'
                }
            ]
        },
        {
            name: 'lol2',
            fields: [
                {
                    name: 'asd',
                    value: 'asd\nasd'
                }
            ]
        },
        {
            name: 'sanita',
            fields: [
                {
                    name: 'asd',
                    value: 'asd\nasd'
                }
            ]
        },
        {
            name: 'iodo',
            fields: [
                {
                    name: 'asd',
                    value: 'asd\nasd'
                }
            ]
        }
    ];
    const delegate = {};

    elemEdit.onclick = () => elemNavigator.pushPage('edit.html', { data: { secrets: secrets }});

    delegate.countItems = () => {
        return secrets.length;
    };

    delegate.createItemContent = (index) => {
        const secret = secrets[index];
        const elemItem = ons.createElement('<ons-list-item modifier="chevron" tappable>' + secret.name + '</ons-list-item>');

        elemItem.onclick = () => {
            elemNavigator.pushPage('secret.html', { data: { secret: secret }});
        };

        return elemItem;
    };

    elemSecretsList.delegate = delegate;
    elemSecretsList.refresh();
};

export {
    init
};
