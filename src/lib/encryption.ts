import * as openpgp from 'openpgp';

export const encryptMessage = async (message: string, publicKey: string) => {
    const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }),
        encryptionKeys: publicKeyObj
    });
    return encrypted
}