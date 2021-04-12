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
            toast('Invalid plaintext', true);
            return;
        }

        if (!passwordElem.value) {
            toast('Invalid password', true);
            return;
        }

        actionElem.disabled = true;
        actionElem.classList.toggle('is-loading');

        await new Promise(resolve => setTimeout(resolve));

        try {
            if (encrypted) {
                let plaintext;

                try {
                    plaintext = await aes256EaxArgon2Decrypt(passwordElem.value, textElem.value);
                } catch (e) {
                    if (e === DECRYPT_EXCEPTION) {
                        toast('Invalid password', true);
                    } else {
                        toast('Something happened, error:' + JSON.stringify(e), true);
                        console.error('error', e);
                    }

                    return;
                }

                encrypted = false;
                textLabelElem.innerHTML = 'Plaintext';
                textElem.value = plaintext;
                actionElem.innerHTML = 'Encrypt';
                toast('Decrypted');
            } else {
                let ciphertext;

                try {
                    ciphertext = await aes256EaxArgon2Encrypt(passwordElem.value, textElem.value);
                } catch (e) {
                    toast('Something happened', true);
                    console.error('error', e);
                    return;
                }

                let response;

                try {
                    response = await fetch('https://api.shrtco.de/v2/shorten', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `url=${origin}${pathname}%23${ciphertext}`
                    });
                } catch (e) {
                    toast('Something happened', true);
                    console.error('error', e);
                    return;
                }

                let data;

                try {
                    data = await response.json();
                } catch (e) {
                    toast('Something happened', true);
                    console.error('error', e);
                    return;
                }

                if (!data.ok) {
                    toast('Something happened', true);
                    console.error('error', data);
                    return;
                }

                const url = data.result.full_short_link3;
                const toastMessage = document.createElement('div');
                toastMessage.innerText = `Share link: ${url}`;

                if (navigator.clipboard && window.isSecureContext) {
                    toastMessage.style.cursor = 'pointer';
                    toastMessage.addEventListener('click', async () => {
                        await navigator.clipboard.writeText(url);
                        toast('Copied to clipboard');
                    });
                }

                toast(toastMessage);
            }
        } finally {
            actionElem.disabled = false;
            actionElem.classList.toggle('is-loading');
        }
    });
});
