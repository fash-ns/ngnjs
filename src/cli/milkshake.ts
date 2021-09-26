#!/usr/bin/env node

import {existsSync} from "fs";

const basePath = process.cwd() + '/node_modules/ngnjs';

const args = process.argv.slice(2);
const command = args[0];

if (!existsSync(`${basePath}/dist/cli/${command}.js`)) {
    console.log("\x1b[31mThis command is not defined\x1b[0m");
    process.exit();
}
require(`${basePath}/dist/cli/${command}`);
