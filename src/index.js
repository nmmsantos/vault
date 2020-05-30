import { init as unlock_page_init } from "./pages/unlock-page";
import { init as config_page_init } from "./pages/config-page";
import { init as list_page_init } from "./pages/list-page";
import { init as secret_page_init } from "./pages/secret-page";
import { init as edit_page_init } from "./pages/edit-page";

const PAGES = {
    unlock_page_init: unlock_page_init,
    config_page_init: config_page_init,
    list_page_init: list_page_init,
    secret_page_init: secret_page_init,
    edit_page_init: edit_page_init
};

ons.ready(() => {
    // ons.disableIconAutoPrefix();

    new ClipboardJS('.clipboard', {
        text: (trigger) => trigger.dataset.clipboardText
    });

    document.addEventListener('init', (e) => {
        const page = e.target;

        if (page.id) {
            const delegate = PAGES[`${page.id}_init`];

            if (_.isFunction(delegate)) {
                delegate(page);
            }
        }
    }, false);
});
