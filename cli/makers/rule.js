const input = require("../input");
const createFile = require("../createFile");

const createValidationRule = async () => {
    const name = await input("Select a path/name for your rule: ");
    await createFile(name, "./src/validationRules", ["./stubs/validationRule.stub"]);
}

module.exports = createValidationRule;