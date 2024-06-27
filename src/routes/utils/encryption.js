import { AES } from 'crypto-js';

const encryptPayload = (data) => {
    try {
        if (typeof data === 'object') {
            return AES.encrypt(JSON.stringify(data), `${process.env.ENCRYPTION_KEY}`).toString()
        }
        if (typeof data === 'string') {
            return AES.encrypt(data, `${process.env.ENCRYPTION_KEY}`).toString()
        }
    } catch (error) {
        Promise.reject(error)
    }
}

export default encryptPayload;