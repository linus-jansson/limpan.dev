import * as openpgp from 'openpgp';

export const encryptMessage = async (message: string, publicKey: string) => {
    const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });

    const armoredMessage = await openpgp.createMessage({ 'text': message });
    const encrypted = await openpgp.encrypt({
        message: armoredMessage,
        encryptionKeys: publicKeyObj,
        config: { preferredCompressionAlgorithm: openpgp.enums.compression.zlib } 
    });
    return encrypted
}