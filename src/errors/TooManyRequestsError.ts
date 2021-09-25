import NGNError from "./NGNError";

class TooManyRequestsError extends NGNError{
    constructor(message: string) {
        super(429, message);

    }
}

export default TooManyRequestsError;