interface Rule {
    evaluate(object: any): boolean | Promise<boolean>
    getError(fieldName: string) : string
}

export default Rule;