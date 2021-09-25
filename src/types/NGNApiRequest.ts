import {NextApiRequest} from "types/NextApiRequest";
import Keyable from "./Keyable";
import Rule from "services/validator/rules/Rule";
import UploadedFile from "facades/File/UploadedFile";

export type NGNApiRequest = NextApiRequest & {
    files: Keyable<UploadedFile | Array<UploadedFile>>;
    session: Keyable;
    all: Keyable
    validate: (validationObject: Keyable<Array<Rule>>) => Promise<void>;
    ip: string | null
};