import Rule from "./Rule";

class NumberRule implements Rule {
    evaluate(object: any): boolean {
        if (typeof object === "number")
            return true;
        if (typeof object === "string")
            return /^\d+$/.test(object)
        return (!object && typeof object !== "boolean");
    }

    getError(fieldName: string): string {
        return `${fieldName} must be a number`;
    }
}

export default NumberRule;