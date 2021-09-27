import Rule from "./Rule";

class InRule implements Rule {
    private readonly arr: Array<string|number>;
    constructor(arr: Array<string|number>) {
        this.arr = arr;
    }
    evaluate(object: any): boolean {
        return ((!object && typeof object !== "boolean") || this.arr.includes(object));
    }

    getError(fieldName: string): string {
        const arrayString = JSON.stringify(this.arr);
        return `${fieldName} must be in ${arrayString}`;
    }

}

export default InRule;