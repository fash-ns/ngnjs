#!/usr/bin/env node

const fs = require("fs");
const basePath = process.cwd() + '/node_modules/ngnjs';

const args = process.argv.slice(2);
const command = args[0];

if (!fs.existsSync(`${basePath}/cli/${command}.js`)) {
    console.log("\x1b[31mThis command is not defined\x1b[0m");
    return;
}
require(`${basePath}/cli/${command}`);
