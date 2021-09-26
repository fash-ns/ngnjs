import input from "../utils/input";
import createFile from "../utils/createFile";

const createMiddleware = async () => {
    const name = await input("Select a path/name for your middleware: ");
    await createFile(name, "./src/middlewares", "./stubs/middleware.stub");
}

export = createMiddleware;