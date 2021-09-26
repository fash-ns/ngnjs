import {NextApiRequest} from "../types/NextApiRequest";
import Keyable from "./Keyable";
import Rule from "../services/validator/rules/Rule";
import UploadedFile from "../facades/File/UploadedFile";
import {Session} from "next-session/lib/types";

export type NGNApiRequest = NextApiRequest & {
    files: Keyable<UploadedFile | Array<UploadedFile>>;
    session: Session;
    all: Keyable
    validate: (validationObject: Keyable<Array<Rule>>) => Promise<void>;
    ip: string | null
};