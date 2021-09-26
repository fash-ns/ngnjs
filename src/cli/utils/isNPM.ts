import {existsSync} from "fs";

const isNPM = () => {
    const basePath = process.cwd();
    if(!existsSync(basePath + "/yarn.lock"))
        return "yarn";
    else return "npm";
}

export default isNPM;