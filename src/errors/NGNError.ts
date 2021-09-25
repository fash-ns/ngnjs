import Keyable from "../types/Keyable";

class NGNError extends Error{
    public readonly status: number;
    public readonly context: Keyable;
    public isPrivateMessage: boolean = false;

    constructor(status: number, message: string, context: Keyable = {}) {
        super(message);
        this.status = status;
        this.context = context ?? {};
    }
}

export default NGNError;