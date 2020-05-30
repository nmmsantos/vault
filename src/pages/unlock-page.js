import { SECRETS_LOAD_EXCEPTION } from "../constants";
import { load } from "../vault";

const init = (page) => {
    const elemNavigator = document.getElementById('navigator');
    const elemSecretsDb = document.getElementById('secrets-db');
    const elemConfig = page.querySelector('#config');
    const elemUnlock = page.querySelector('#unlock');
    const elemPassword = page.querySelector('#password');
    const defaultSecretsDb = 'WyI3ODkxNDNkNjExOGNjOWQ4NzM0NzdjNjA0NDI1MjdjZiIsMTAsMTAyNDAsMzIsNCwiQXJnb24yaWQiLHRydWVd.zrmbstnmmpfGGOO883J4RMeDc63QgRnkyG4zuuWrFxZAFVosGadiGcltNFmInhU1voyv08cA1hMz/W5wiuG5KY5PlETNrjDYuHGYSuT2Ce3OeV5FYo2YNZOhf1TXtXDk6ZJki74kI4G8KM78tPQueTL/U8Zj7wk=';

    if(elemSecretsDb.value === defaultSecretsDb) {
        elemPassword.setAttribute('placeholder', 'Default: 1234');
    }

    elemConfig.onclick = () => {
        elemNavigator.pushPage('config.html');
    };

    elemUnlock.onsubmit = (e) => {
        e.preventDefault();

        const password = elemPassword.value;

        if (password === '') return;

        load(password, elemSecretsDb.value)
            .then((result) => {
                elemNavigator.resetToPage('list.html', { data: { secrets: result }});
            })
            .catch((error) => {
                elemPassword.value = '';

                if(error === SECRETS_LOAD_EXCEPTION) {
                    ons.notification.alert('Wrong password');
                } else {
                    throw error;
                }
            });
    }
};

export {
    init
};
