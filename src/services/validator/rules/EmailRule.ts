import Rule from "./Rule";

class EmailRule implements Rule {

    evaluate(object: any): boolean {
        if (typeof object === "string")
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(object)
        return (!object && typeof object !== "boolean");
    }

    getError(fieldName: string): string {
        return `${fieldName} must be a valid email address`;
    }

}

export default EmailRule;