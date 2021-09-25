import {NGNApiRequest} from "types/NGNApiRequest";
import {NGNApiResponse} from "types/NGNApiResponse";
import RedisCache from "services/cache/RedisCache";
import {networkInterfaces} from "os";
import sampleConfig from "config/rate-limit";
import TooManyRequestsError from "errors/TooManyRequestsError";
import loadConfFile from "utils/helpers/loadConfFile";

const withThrottle = async (req: NGNApiRequest & {ip: string | null}, res: NGNApiResponse, next: () => void) => {
    const config = loadConfFile("config/rate-limit", sampleConfig);
    const rateLimitInSeconds = config.duration;
    const numberOfRequests = config.number;
    console.log({rateLimitInSeconds});
    const cache = new RedisCache();
    let serverIp = '';
    if((await cache.has("server_ip")))
        serverIp = await cache.get("server_ip")
    else {
        const eth0 = networkInterfaces()?.eth0;
        if(Array.isArray(eth0) && eth0.length > 0) {
            serverIp = eth0[0].address;
            await cache.set("server_ip", serverIp, 86400);
        }
    }
    const exceptions = [serverIp, ...config.ipExceptions];
    if(req.ip === null || exceptions.includes(req.ip))
        next();
    else {
        const key = `${req.url}|${req.ip}`;
        if(!(await cache.has(key))){
            await cache.set(key, 1, rateLimitInSeconds);
            next();
        } else {
            const val = parseInt(await cache.get(key));
            if(val >= numberOfRequests)
                throw new TooManyRequestsError("Too many requests");
            const ttl = await cache.getTTL(key);
            await cache.set(key, val + 1, ttl);
            next();
        }
    }
}

export default withThrottle;
