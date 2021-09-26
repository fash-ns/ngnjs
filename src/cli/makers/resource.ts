import input from "../utils/input";
import createFile from "../utils/createFile";

const createResource = async () => {
    const name = await input("Select a path/name for your resource: ");
    await createFile(name, "./src/resources", "./stubs/resource.stub");
}

export = createResource;