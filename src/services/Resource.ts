import Keyable from "types/Keyable";

export default abstract class Resource {
    private readonly resource: Keyable | Array<Keyable>;

    constructor(resource: Keyable | Array<Keyable>) {
        this.resource = resource;
    }

    protected make(context: Keyable): Keyable{
        return context;
    };

    toKeyable(): Keyable | Array<Keyable> {
        if (Array.isArray(this.resource)) {
            return this.resource.map((item) => this.make(item));
        }
        return this.make(this.resource);
    }
}