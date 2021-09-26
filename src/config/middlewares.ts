import withSetCookie from "../middlewares/withSetCookie";
import decryptCookies from "../middlewares/decryptCookies";
import Keyable from "../types/Keyable";
import {Middleware} from "../types/Middleware";
import withRequest from "../middlewares/withRequest";
import withValidator from "../middlewares/withValidator";
import withIp from "../middlewares/withIp";
import withThrottle from "../middlewares/withThrottle";
import withSession from "../middlewares/withSession";


const middlewares: Keyable<Array<Middleware>> = {
    "/": [
        withRequest,
        withIp,
        withThrottle,
        decryptCookies,
        withSetCookie,
        withValidator,
        withSession
    ]
};

export default middlewares;