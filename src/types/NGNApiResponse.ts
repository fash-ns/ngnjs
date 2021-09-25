import {NextApiResponse} from "../types/NextApiResponse";
import {CookieSerializeOptions} from "cookie";

export type NGNApiResponse = NextApiResponse & {
    setCookie: (name: string, value: string, options?: CookieSerializeOptions) => NextApiResponse
};