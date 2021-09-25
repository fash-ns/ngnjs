import {HashedData} from "types/HashedData";
import Hash from "facades/Hash";
import Keyable from "types/Keyable";
import {NextHandler} from "types/NextHandler";
import {Middleware} from "types/Middleware";
import {NextApiRequest} from "types/NextApiRequest";
import {NextApiResponse} from "types/NextApiResponse";
import EnvKeyIsNotSetError from "errors/EnvKeyIsNotSetError";

const decryptCookies: Middleware = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const cookies: Keyable<string> = req.cookies;
    const prefix: string | undefined = process.env.COOKIE_PREFIX;
    if(typeof prefix === "undefined")
        throw new EnvKeyIsNotSetError("COOKIE_PREFIX env variable is not set");

    for (let key in cookies){
        if(cookies.hasOwnProperty(key)){
            if(key.includes(prefix)) {
                try {
                    cookies[key] = Hash.base64Decode(cookies[key]);
                    const hashedData = <HashedData>JSON.parse(cookies[key]);
                    const newKey = key.replace(prefix + "_", "");
                    req.cookies[newKey] = Hash.AESDecrypt(hashedData);
                    delete req.cookies[key];
                } catch (e) {}
            }
        }
    }
    next();
}

export default decryptCookies;