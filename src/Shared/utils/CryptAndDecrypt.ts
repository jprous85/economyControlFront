import * as CryptoJS from 'crypto-js';
import env from "react-dotenv";

const secretPass = env.CRYPTO_TOKEN; // get string for env file

export const encryptData = (text: string) => {
    return CryptoJS.AES.encrypt(
        JSON.stringify(text),
        secretPass
    ).toString();
};

export const decryptData = (text: string) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    try {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err){
        return 'noDecrypt'
    }
};
