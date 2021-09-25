import {IncomingMessage} from "http";
import Keyable from "./Keyable";

export type NextApiRequest = IncomingMessage & {
    /**
     * Object of `query` values from url
     */
    query: {
        [key: string]: string | string[];
    };
    /**
     * Object of `cookies` from header
     */
    cookies: {
        [key: string]: string;
    };
    body: any;
    env: Keyable;
    preview?: boolean;
    /**
     * Preview data set on the request, if any
     * */
    previewData?: string | false | object | undefined;
}