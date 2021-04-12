import { init as unlockPageInit } from "./pages/unlock";
import { init as configPageInit } from "./pages/config";
import { init as listPageInit } from "./pages/list";
import { init as secretPageInit } from "./pages/secret";
import { init as editPageInit } from "./pages/edit";

const PAGES = {
    unlockPageInit: unlockPageInit,
    configPageInit: configPageInit,
    listPageInit: listPageInit,
    secretPageInit: secretPageInit,
    editPageInit: editPageInit
};

ons.ready(() => {
    // ons.disableIconAutoPrefix();

    new ClipboardJS('.clipboard', {
        text: (trigger) => trigger.dataset.clipboardText
    });

    document.addEventListener('init', (e) => {
        const page = e.target;

        if (page.id) {
            const delegate = PAGES[`${page.id}Init`];

            if (_.isFunction(delegate)) {
                delegate(page);
            }
        }
    }, false);
});
