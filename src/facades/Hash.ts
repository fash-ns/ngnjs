import {createCipheriv, createDecipheriv, randomBytes} from "crypto";
import {HashedData} from "types/HashedData";
import EnvKeyIsNotSetError from "errors/EnvKeyIsNotSetError";

class Hash {
    private static readonly key: string | undefined = process.env.APP_KEY;

    public static AESEncrypt(str: string): HashedData {
        if (typeof Hash.key === "undefined")
            throw new EnvKeyIsNotSetError("Application key is not set");
        const iv = randomBytes(16);
        const cipher = createCipheriv('aes-256-cbc', Buffer.from(Hash.key), iv);
        let encrypted = cipher.update(str);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: iv.toString('hex'),
            data: encrypted.toString('hex')
        };
    }

    public static AESDecrypt(hashedObject: HashedData): string {
        if (typeof Hash.key === "undefined")
            throw new EnvKeyIsNotSetError("Application key is not set");
        let iv = Buffer.from(hashedObject.iv, 'hex');
        let encryptedText = Buffer.from(hashedObject.data, 'hex');
        let decipher = createDecipheriv('aes-256-cbc', Buffer.from(Hash.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    public static AESEquals(hashedObject: HashedData, originalString: string): boolean {
        return originalString.match(Hash.AESDecrypt(hashedObject)) !== null;
    }

    public static base64Encode(str: string): string {
        let buff = new Buffer(str);
        return buff.toString('base64');
    }

    public static base64Decode(str: string): string {
        let buff = new Buffer(str, "base64");
        return buff.toString('ascii');
    }

    public static base64UrlEncode(str: string): string {
        let base64 = Hash.base64Encode(str);
        base64 = base64.replace(/\+/g, '-');
        base64 = base64.replace(/\//g, '_');
        return base64.replace(/=/g, '');
    }

    public static base64UrlDecode(str: string): string {
        let base64 = str.replace(/-/g, '+');
        base64 = base64.replace(/_/g, '/');
        while(base64.length % 4 !== 0)
            base64 = base64 + "=";
        return Hash.base64Decode(base64);
    }
}

export default Hash;