import NGNError from "./NGNError";
import Keyable from "../types/Keyable";

class ValidationError extends NGNError{
    constructor(message: string, context: Keyable) {
        super(422, message, context);
    }
}

export default ValidationError;