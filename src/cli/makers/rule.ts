import input from "../utils/input";
import makeFileFromStub from "../utils/makeFileFromStub";

const createValidationRule = async () => {
    const name = await input("Select a path/name for your rule: ");
    await makeFileFromStub(name, "./src/validationRules", "/validationRule.stub");
}

export = createValidationRule;