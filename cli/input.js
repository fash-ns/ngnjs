const rl = require("./rl");

async function input(prompt) {
    console.log("\x1b[33m" + prompt + "\x1b[0m");
    return (await rl[Symbol.asyncIterator]().next()).value;
}

module.exports = input;