import {existsSync} from "fs";

const loadConfFile = (path: string, defaultConf: any) => {
    const absolutePath = process.cwd() + '/' + path + '.js';
    const confExist = existsSync(absolutePath);
    if(confExist)
        return require(absolutePath);
    return defaultConf;
}

export default loadConfFile;