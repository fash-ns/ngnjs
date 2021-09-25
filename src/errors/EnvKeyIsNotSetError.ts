import NGNSilentError from "./NGNSilentError";

class EnvKeyIsNotSetError extends NGNSilentError{
    constructor(message: string) {
        super(500, message);
    }
}

export default EnvKeyIsNotSetError;