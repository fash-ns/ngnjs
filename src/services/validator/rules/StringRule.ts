import Rule from "./Rule";

class StringRule implements Rule {
    evaluate(object: any): boolean {
        return ((!object && typeof object !== "boolean") || typeof object === "string");
    }

    getError(fieldName: string): string {
        return `${fieldName} must be a string`;
    }

}

export default StringRule;