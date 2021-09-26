const basePath = process.cwd();

const packageCheck = (name) => {
    const fs = require("fs");
    const packageJsonPath = basePath + "/package.json";
    if(!fs.existsSync(packageJsonPath))
        return false;
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    return packageJson.dependencies.hasOwnProperty(name);
}

module.exports = packageCheck;