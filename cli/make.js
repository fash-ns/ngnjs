const basePath = process.cwd() + '/node_modules/ngn';

const fs = require("fs");
const rl = require("./utils/rl");

const args = process.argv.slice(2);
const command = args[1];
const exec = async () => {
    if (!fs.existsSync(`${basePath}/cli/makers/${command}.js`)) {
        console.log("\x1b[31mThis command is not defined\x1b[0m");
        return;
    }
    const func = require(`${basePath}/cli/makers/${command}`);
    await func();
}

exec().then(() => {rl.close()});
