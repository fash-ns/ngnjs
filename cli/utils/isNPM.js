const isNPM = () => {
    const basePath = process.cwd();
    const fs = require("fs");
    if(!fs.existsSync(basePath + "/yarn.lock"))
        return "yarn";
    else return "npm";
}

module.exports = isNPM;