import {createInterface} from "readline"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

export default rl;