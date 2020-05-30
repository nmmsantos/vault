const init = (page) => {
    const elemTitle = page.querySelector('ons-toolbar .center');
    const elemFieldsList = page.querySelector('#fields-list');
    const secret = page.data.secret;
    const fields = secret.fields;
    const delegate = {};

    delegate.countItems = () => {
        return fields.length;
    };

    delegate.createItemContent = (index) => {
        const field = fields[index];
        const icon = field.hidden
            ? 'ion-ios-key, material:ion-md-key'
            : field.multiline
                ? 'ion-ios-reorder, material:ion-md-reorder'
                : 'ion-ios-at, material:ion-md-at';

        const fieldValue = field.hidden ? '****' : field.value;

        const elemItem = ons.createElement(`
            <ons-list-item class="clipboard" data-clipboard-text="${field.value}" tappable>
                <input type="hidden" id="foo" value="3487">
                <div class="left">
                    <ons-icon icon="${icon}" class="list-item__icon"></ons-icon>
                </div>
                <div class="center">
                    <span class="list-item__title">${field.name}</span><span class="list-item__subtitle">${fieldValue}</span>
                </div>
            </ons-list-item>
        `);

        //item.onclick = function () {
        //    navigatorElem.pushPage('secret.html', { data: secret });
        //}
        return elemItem;
    }

    elemTitle.innerHTML = secret.name;
    elemFieldsList.delegate = delegate;
    elemFieldsList.refresh();
}

export {
    init
};
