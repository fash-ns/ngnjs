import input from "../utils/input";
import makeFileFromStub from "../utils/makeFileFromStub";

const createResource = async () => {
    const name = await input("Select a path/name for your resource: ");
    await makeFileFromStub(name, "./src/resources", "/resource.stub");
}

export = createResource;