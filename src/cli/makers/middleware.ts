import input from "../utils/input";
import makeFileFromStub from "../utils/makeFileFromStub";

const createMiddleware = async () => {
    const name = await input("Select a path/name for your middleware: ");
    await makeFileFromStub(name, "./src/middlewares", "/middleware.stub");
}

export = createMiddleware;