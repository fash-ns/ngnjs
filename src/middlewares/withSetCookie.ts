import {CookieSerializeOptions, serialize} from "cookie";
import Hash from "../facades/Hash";
import {NGNApiResponse} from "../types/NGNApiResponse";
import {NextHandler} from "../types/NextHandler";
import {Middleware} from "../types/Middleware";
import {NextApiRequest} from "../types/NextApiRequest";
import {NextApiResponse} from "../types/NextApiResponse";
import EnvKeyIsNotSetError from "../errors/EnvKeyIsNotSetError";

const setCookie = (res: NextApiResponse) => (name: string, value: string, options: CookieSerializeOptions = {}) => {
    options.secure = process.env.NODE_ENV === 'production';
    const prefix: string | undefined = process.env.COOKIE_PREFIX;
    if(typeof prefix === "undefined")
        throw new EnvKeyIsNotSetError("COOKIE_PREFIX env variable is not set");

    if ('maxAge' in options && options.maxAge != null) {
        options.expires = new Date(Date.now() + options.maxAge)
        options.maxAge /= 1000
    }

    const encryptedValue: string = Hash.base64Encode(JSON.stringify(Hash.AESEncrypt(value)));

    res.setHeader('Set-Cookie', serialize(`${prefix}_${name}`, encryptedValue, options));
    return res;
}

const withSetCookie: Middleware = (req: NextApiRequest, res:  NGNApiResponse, next: NextHandler) => {
    res.setCookie = setCookie(res);
    next();
}

export default withSetCookie;