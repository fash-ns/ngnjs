const input = require("../input");
const createFile = require("../createFile");

const createMiddleware = async () => {
    const name = await input("Select a path/name for your middleware: ");
    await createFile(name, "./src/middlewares", ["./stubs/middleware.stub"]);
}

module.exports = createMiddleware;