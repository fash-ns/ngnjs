import fs from "fs";

const loadConfFile = (path: string) => {
    const absolutePath = process.cwd() + '/' + path + '.json';
    const confExist = fs.existsSync(absolutePath);
    if(confExist){
        const file = fs.readFileSync(absolutePath).toString();
        return JSON.parse(file);
    }
    throw new Error(`Cannot locate '${absolutePath}'. Did you forget to use 'milkshake init'?`)
}

export default loadConfFile;