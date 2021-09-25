import fs from "fs";

const loadConfFile = (path: string, defaultConf: any) => {
    const absolutePath = process.cwd() + '/' + path + '.json';
    const confExist = fs.existsSync(absolutePath);
    if(confExist){
        const file = fs.readFileSync(absolutePath).toString();
        return JSON.parse(file);
    }
    return defaultConf;
}

export default loadConfFile;