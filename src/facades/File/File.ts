import * as fs from "fs";
import FileNotFoundError from "../../errors/FileNotFoundError";
import Keyable from "../../types/Keyable";
import fileType from "file-type";

class File{
    protected fileObject: Keyable;

    constructor(file: string) {
        if (!File.exists(file))
            throw new FileNotFoundError("File does not exist")
        const stats = fs.statSync(file);
        this.fileObject = {
            path: file,
            size: stats.size,
            name: file.split("/").pop() ?? null,
            type: null,
        }
    }

    public get(key: string){
        return this.fileObject.hasOwnProperty(key) ? this.fileObject[key] : undefined;
    }

    public async guessMimeType(): Promise<string>{
        const result = await this.guessFileInfo();
        const mime = result.mime
        this.fileObject.type = mime;
        return mime;
    }

    public async guessExtension(): Promise<string | null>{
        const result = await this.guessFileInfo();
        return result.ext
    }

    private async guessFileInfo(): Promise<{mime: string, ext: string | null}>{
        const result = await fileType.fromFile(this.fileObject.path);
        if(!result) {
            const ext = this.fileObject.name?.split(".").pop() ?? null;
            return {mime: this.fileObject.type ?? "application/octet-stream", ext};
        }
        return result;
    }

    public async remove(): Promise<void>{
        await fs.promises.unlink(this.fileObject.path);
    }

    public async getBuffer(): Promise<Buffer>{
        return await fs.promises.readFile(this.fileObject.path);
    }

    public static exists(path: string): boolean{
        return fs.existsSync(path);
    }

}

export default File;