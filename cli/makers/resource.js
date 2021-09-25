const input = require("../input");
const createFile = require("../createFile");

const createResource = async () => {
    const name = await input("Select a path/name for your resource: ");
    await createFile(name, "./src/resources", ["./stubs/resource.stub"]);
}

module.exports = createResource;