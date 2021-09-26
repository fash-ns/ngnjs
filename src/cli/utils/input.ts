import rl from "./rl"

async function input(prompt: string) {
    console.log("\x1b[33m" + prompt + "\x1b[0m");
    return (await rl[Symbol.asyncIterator]().next()).value;
}

export default input;