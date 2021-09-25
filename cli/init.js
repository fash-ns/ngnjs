const fs = require("fs");

const basePath = process.cwd();

const exec = async () => {
    await fs.promises.mkdir(basePath + "/storage/logs", {recursive: true});
    await fs.promises.mkdir(basePath + "/storage/cache", {recursive: true});
    await fs.promises.mkdir(basePath + "/storage/public/uploads", {recursive: true});

    await fs.promises.writeFile(basePath + "/storage/logs/.gitignore", "*.log")
    await fs.promises.writeFile(basePath + "/storage/cache/.gitignore", "*\n!.gitignore")
    await fs.promises.writeFile(basePath + "/storage/public/uploads/.gitignore", "*\n!.gitignore")

    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/env.stub', basePath + "/.env.example");
    await fs.promises.copyFile(basePath + '/node_modules/ngn/stubs/env.stub', basePath + "/.env");

    require("./keygen");
}

exec().then(() => console.log("\x1b[32mNGN has been initialized\x1b[0m"))