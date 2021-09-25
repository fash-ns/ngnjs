import EnvKeyIsNotSetError from "errors/EnvKeyIsNotSetError";

class Path{
    public static makeStorageUrl(path: string){
        path = Path.fixSlashes(path);
        const baseUrl: string | undefined = process.env.STORAGE_BASE_URL;
        if(typeof baseUrl === "undefined")
            throw new EnvKeyIsNotSetError("STORAGE_BASE_URL env variable is not set");
        return baseUrl + '/' + path;
    }

    public static makeStoragePath(path: string){
        path = Path.fixSlashes(path);
        return process.env.PWD + '/storage/' + path;
    }

    public static makePublicStoragePath(path: string){
        path = Path.fixSlashes(path);
        return process.env.PWD + '/storage/public/' + path;
    }

    public static makeUploadsPath(path: string){
        path = Path.fixSlashes("/uploads/" + path);
        return Path.makePublicStoragePath(path);
    }

    public static fixSlashes(path: string){
        return path.replace(/(\/\/+)/g, "/")
            .replace(/(^\/+)|(\/+$)/g, "");
    }
}

export default Path;