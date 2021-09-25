import {existsSync} from "fs";

const loadConfFile = (path: string, defaultConf: any) => {
    const absolutePath = process.cwd() + '/' + path + '.config';
    const confExist = existsSync(absolutePath + '.js');
    console.log("file name is: ", absolutePath);
    if(confExist)
        return require(absolutePath);
    return defaultConf;
}

export default loadConfFile;