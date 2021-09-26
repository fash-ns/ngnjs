import {existsSync} from "fs";
import rl from "./utils/rl"

const basePath = process.cwd() + '/node_modules/ngnjs';

const args = process.argv.slice(2);
const command = args[1];
const exec = async () => {
    if (!existsSync(`${basePath}/dist/cli/makers/${command}.js`)) {
        console.log("\x1b[31mThis command is not defined\x1b[0m");
        return;
    }
    const func = require(`${basePath}/dist/cli/makers/${command}`);
    await func();
}

exec().then(() => {rl.close()});
