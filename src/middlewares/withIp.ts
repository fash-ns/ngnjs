import {Middleware} from "types/Middleware";
import {NGNApiRequest} from "types/NGNApiRequest";
import {NGNApiResponse} from "types/NGNApiResponse";
import {NextHandler} from "types/NextHandler";
import sampleTrustedProxies from "config/trustedProxies";
import Ip from "facades/Ip";
import loadConfFile from "utils/helpers/loadConfFile";

/**
 * @author FaSh<farbodshams.2000@gmail.com>
 * Sets client IP address to req.ip. If request is sent from a trusted proxy, then x-forwarded-for and x-real-ip is
 * checked. else, remote_address will be set as ip.
 * @param req
 * @param res
 * @param next
 */

const withIp: Middleware = (req: NGNApiRequest, res: NGNApiResponse, next: NextHandler) => {
    const trustedProxies = loadConfFile("config/trustedProxies", sampleTrustedProxies);
    const remoteAddress = req.connection.remoteAddress?.substr(7);
    let ip = remoteAddress;
    if(typeof remoteAddress !== "undefined" && Ip.validate(remoteAddress) && trustedProxies.includes(remoteAddress))
        ip = <string>req.headers["x-forwarded-for"] ?? <string>req.headers["x-real-ip"] ?? remoteAddress;
    req.ip = ip ?? null;
    next();
}

export default withIp;