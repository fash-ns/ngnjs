import {NGNApiRequest} from "./NGNApiRequest";
import {NGNApiResponse} from "./NGNApiResponse";
import {NextHandler} from "./NextHandler";

export type Middleware = (req: NGNApiRequest, res: NGNApiResponse, next: NextHandler) => void;