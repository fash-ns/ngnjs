import input from "../utils/input";
import createFile from "../utils/createFile";

const createValidationRule = async () => {
    const name = await input("Select a path/name for your rule: ");
    await createFile(name, "./src/validationRules", "./stubs/validationRule.stub");
}

export = createValidationRule;