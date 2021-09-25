import Rule from "./Rule";

class RequiredRule implements Rule {
    evaluate(object: any): boolean | Promise<boolean> {
        return !(typeof object === "undefined" || object === null);
    }

    getError(fieldName: string): string {
        return `${fieldName} is required`;
    }
}

export default RequiredRule;