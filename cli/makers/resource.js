const input = require("../utils/input");
const createFile = require("../utils/createFile");

const createResource = async () => {
    const name = await input("Select a path/name for your resource: ");
    await createFile(name, "./src/resources", "./stubs/resource.stub");
}

module.exports = createResource;