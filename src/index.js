import { DECRYPT_EXCEPTION } from './constants';
import { aes256EaxArgon2Decrypt, aes256EaxArgon2Encrypt } from "./lib/crypto";

const toast = (message, error = false) => bulmaToast.toast({
    message: message,
    type: error ? 'is-danger' : 'is-success',
    duration: 4000,
    closeOnClick: false,
    pauseOnHover: true,
    position: 'top-right',
    animate: {
        in: 'fadeInRight',
        out: 'fadeOutRight'
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const textLabelElem = document.querySelector('#textLabel');
    const textElem = document.querySelector('#text');
    const passwordElem = document.querySelector('#password');
    const actionElem = document.querySelector('#action');
    const copyElem = document.querySelector('#copy');

    const { hash, origin, pathname } = window.location;
    window.location.hash = '';
    let encrypted = Boolean(hash);

    if (encrypted) {
        textLabelElem.innerHTML = 'Ciphertext';
        textElem.value = hash.substring(1);
        actionElem.innerHTML = 'Decrypt';
    }

    actionElem.addEventListener('click', async () => {
        if (!textElem.value) {
            textElem.classList.add('is-danger');
            return;
        }

        if (!passwordElem.value) {
            passwordElem.classList.add('is-danger');
            return;
        }

        textElem.classList.remove('is-danger');
        passwordElem.classList.remove('is-danger');
        actionElem.disabled = true;
        actionElem.classList.add('is-loading');
        copyElem.setAttribute('style', 'display: none');
        copyElem.removeAttribute('data-clipboard');

        await new Promise(resolve => setTimeout(resolve));

        try {
            if (encrypted) {
                let plaintext;

                try {
                    plaintext = await aes256EaxArgon2Decrypt(passwordElem.value, textElem.value);
                } catch (e) {
                    if (e === DECRYPT_EXCEPTION) {
                        passwordElem.classList.add('is-danger');
                    } else {
                        console.error('error', e);
                    }

                    return;
                }

                encrypted = false;
                textLabelElem.innerHTML = 'Plaintext';
                textElem.value = plaintext;
                actionElem.innerHTML = 'Encrypt';
            } else {
                let ciphertext;

                try {
                    ciphertext = await aes256EaxArgon2Encrypt(passwordElem.value, textElem.value);
                } catch (e) {
                    console.error('error', e);
                    return;
                }

                copyElem.setAttribute('data-clipboard', `${origin}${pathname}#${ciphertext}`);
                copyElem.removeAttribute('style');
            }
        } finally {
            actionElem.disabled = false;
            actionElem.classList.toggle('is-loading');
        }
    });

    copyElem.addEventListener('click', async () => {
        await navigator.clipboard.writeText(copyElem.getAttribute('data-clipboard'));
    });
});
