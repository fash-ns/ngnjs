const fs = require("fs");

const basePath = process.cwd();

const envPath = basePath + '/.env.local';
const exampleEnvPath = basePath + './.env.example';

const randomBase64 = (length) => {
    const pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
    const len = pool.length;
    let res = '';
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * (len - 1));
        res += pool[index];
    }
    while (res.length % 4 !== 0)
        res = res + '=';
    return res;
}

const keygen = async () => {
    if(!fs.existsSync(envPath))
        await fs.promises.copyFile(exampleEnvPath, envPath)

    let data = fs.readFileSync(envPath, 'utf8');
    const key = randomBase64(32);
    data = data.replace(/APP_KEY=("[\w\/+]+")?/, `APP_KEY="${key}"`);
    fs.writeFileSync(envPath, data)
}


keygen().then(() => console.log("\x1b[32mnew APP_KEY generated and set successfully\x1b[0m"));