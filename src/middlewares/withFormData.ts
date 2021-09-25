import formidable from "formidable";
import {NGNApiRequest} from "types/NGNApiRequest";
import {NextHandler} from "types/NextHandler";
import {Middleware} from "types/Middleware";
import {NextApiResponse} from "types/NextApiResponse";
import NGNError from "errors/NGNError";
import Keyable from "types/Keyable";
import UploadedFile from "facades/File/UploadedFile";

const form = formidable({multiples: true});

const withFormData: Middleware = async (req: NGNApiRequest, res: NextApiResponse, next: NextHandler) => {
    const contentType = req.headers["content-type"];
    if (contentType && contentType.includes("multipart/form-data")) {
        form.parse(req, (err, fields: formidable.Fields, files: formidable.Files): void => {
            if(err)
                throw new NGNError(500, "");
            req.body = fields;
            const reqFiles: Keyable<UploadedFile | Array<UploadedFile>> = {};
            for(let key in files){
                if(!files.hasOwnProperty(key))
                    continue;
                const file = files[key];
                if(Array.isArray(file)){
                    const val: Array<UploadedFile> = [];
                    file.forEach(item => val.push(new UploadedFile(item)));
                    reqFiles[key] = val;
                } else {
                    reqFiles[key] = new UploadedFile(file);
                }
            }
            req.files = reqFiles;
            next();
        });
    } else {
        next();
    }
}

export default withFormData;