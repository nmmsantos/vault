import { SECRETS_LOAD_EXCEPTION } from "../constants";
import { load } from "../lib/vault";

const init = (page) => {
    const elNavigator = document.getElementById('navigator');
    const elConfig = document.getElementById('config');
    const elNewConfig = page.querySelector('#newConfig');
    const elUnlock = page.querySelector('#unlock');
    const elPassword = page.querySelector('#password');

    elNewConfig.onclick = () => {
        elNavigator.pushPage('config.html');
    };

    elUnlock.onsubmit = async (e) => {
        e.preventDefault();

        const password = elPassword.value;

        if (password === '') return;

        elPassword.value = '';

        try {
            const result = await load(password, elConfig.value);
            console.log(result);
            elNavigator.resetToPage('list.html', { data: { secrets: result }});
        } catch (error) {
            if(error === SECRETS_LOAD_EXCEPTION) {
                ons.notification.alert('Wrong password');
            } else {
                throw error;
            }
        }
    }
};

export {
    init
};
