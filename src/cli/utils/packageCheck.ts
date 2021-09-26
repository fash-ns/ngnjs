import {existsSync, readFileSync} from "fs"

const basePath = process.cwd();

const packageCheck = (name: string) => {
    const packageJsonPath = basePath + "/package.json";
    if(!existsSync(packageJsonPath))
        return false;
    const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
    return packageJson.dependencies.hasOwnProperty(name);
}

export default packageCheck;