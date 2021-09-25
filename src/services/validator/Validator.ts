import Keyable from "types/Keyable";
import Rule from "./rules/Rule";
import {ValidationResult} from "types/ValidationResult";

class Validator {

    public async validate(rules: Keyable<Array<Rule>>, data: Keyable): Promise<ValidationResult> {
        let errors: Keyable = {};
        for (let key in rules) {
            if(rules.hasOwnProperty(key)) {
                let value = data[key] ?? null;
                let keyRules: Array<Rule> = rules[key];
                for (let i = 0; i < keyRules.length; i++) {
                    let rule: Rule = keyRules[i];
                    if (!await rule.evaluate(value)) {
                        errors[key] = rule.getError(key);
                        break;
                    }
                }
            }
        }
        return {
            result: Object.keys(errors).length == 0,
            errors: errors,
        };
    }
}

export default Validator