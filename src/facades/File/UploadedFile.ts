import File from "./File";
import * as fs from "fs";
import Random from "../../facades/Random";
import Path from "../../facades/Path";
import Formidable from "formidable"

class UploadedFile extends File{
    constructor(file: Formidable.File) {
        super(file.path);
    }
    public async upload(path: string = "", isPrivate: boolean = false): Promise<string>{
        let fileExt: string | null = await this.guessExtension();
        if(fileExt !== null)
            fileExt = '.' + fileExt;
        const filename: string = Random.base64(32, true) + fileExt;
        let absolutePath: string;
        let relativePath: string;
        if(isPrivate){
            await fs.promises.mkdir(Path.makeStoragePath(path + '/'), {recursive: true});
            relativePath = Path.fixSlashes(path + '/' + filename);
            absolutePath= Path.makeStoragePath(relativePath);
        } else {
            await fs.promises.mkdir(Path.makeUploadsPath(path + '/'), {recursive: true});
            relativePath = Path.fixSlashes(path + '/' + filename);
            absolutePath = Path.makeUploadsPath(relativePath);
        }
        await fs.promises.copyFile(this.fileObject.path, absolutePath);
        await fs.promises.unlink(this.fileObject.path);
        return relativePath;
    }
}

export default UploadedFile;