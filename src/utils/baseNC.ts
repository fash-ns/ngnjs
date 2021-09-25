import nc from "next-connect"
import sampleMiddlewares from "config/middlewares";
import {NextApiRequest} from "types/NextApiRequest";
import {NextApiResponse} from "types/NextApiResponse";
import Logger from "services/logger/Logger";
import Keyable from "types/Keyable";
import NGNError from "errors/NGNError";
import loadConfFile from "./helpers/loadConfFile";
import {Middleware} from "types/Middleware";

const errorHandler = (err: NGNError, req: NextApiRequest, res: NextApiResponse) => {
    const context: Keyable = {
        url: req.url,
        body: req.body,
        queryString: req.query,
        method: req.method,
    }
    Logger.getInstance().error(err.stack ?? err.message, context);
    const debug: boolean = process.env.APP_DEBUG === "true";
    const body = ((err.isPrivateMessage && !debug) ? {message: "server error"} : {message: err.message, ...err.context});
    res.status(err.status ?? 500).json(body);
    res.end();
}

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(405).json({message: `method ${req.method} is not supported`})
}

const baseNC = () => {
    const middlewares = loadConfFile('config/middlewares', sampleMiddlewares);
    const instance = nc({onError: errorHandler, onNoMatch: noMatchHandler});
    for (let endpoint in middlewares){
        if(middlewares.hasOwnProperty(endpoint))
            middlewares[endpoint].forEach((item: Middleware) => {
                instance.use(`/api${endpoint}`, item);
            });
    }
    return instance;
}

export default baseNC;