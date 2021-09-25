import {NGNApiRequest} from "../types/NGNApiRequest";
import {NGNApiResponse} from "../types/NGNApiResponse";
import {NextHandler} from "../types/NextHandler";
import {Middleware} from "../types/Middleware";

const withRequest: Middleware = (req: NGNApiRequest, res: NGNApiResponse, next: NextHandler) => {
    req.files = {};
    req.all = {...req.query, ...req.files, ...req.body};
    req.ip = null;
    next();
}

export default withRequest;