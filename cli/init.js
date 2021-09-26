const fs = require("fs");

const basePath = process.cwd();

const packageCheck = require("./utils/packageCheck");
const isNpm = require("./utils/isNPM");

const exec = async () => {
    await fs.promises.mkdir(basePath + "/storage/logs", {recursive: true});
    await fs.promises.mkdir(basePath + "/storage/cache", {recursive: true});
    await fs.promises.mkdir(basePath + "/config", {recursive: true});
    await fs.promises.mkdir(basePath + "/storage/public/uploads", {recursive: true});

    await fs.promises.writeFile(basePath + "/storage/logs/.gitignore", "*.log")
    await fs.promises.writeFile(basePath + "/storage/cache/.gitignore", "*\n!.gitignore")
    await fs.promises.writeFile(basePath + "/storage/public/uploads/.gitignore", "*\n!.gitignore")

    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/env.stub', basePath + "/.env.example");
    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/env.stub', basePath + "/.env.local");

    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/handler.stub', basePath + "/handler.ts");

    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/config/middlewares.stub', basePath + "/config/middlewares.ts");
    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/config/rate-limit.stub', basePath + "/config/rate-limit.json");
    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/config/trustedProxies.stub', basePath + "/config/trustedProxies.json");

    if(!packageCheck("next-connect")){
        console.log("\x1b[33mnext-connect is not installed. Please install next-connect@^0.10.2\x1b[0m");
    }

    require("./keygen");
}

exec().then(() => console.log("\x1b[32mNGN has been initialized\x1b[0m"))