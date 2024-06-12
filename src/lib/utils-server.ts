import "server-only";
import fs from "fs";

const PATH_TO_PUBLIC_KEY = 'src/app/pgp/limpan.pgp-key.asc.old'

export const getPgpPublicKey = async (): Promise<string> => {
    return new Promise((resolve, reject
    ) => {
        fs.readFile(PATH_TO_PUBLIC_KEY, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    
    })
}