import NGNSilentError from "./NGNSilentError";

class InvalidConfFileError extends NGNSilentError{
    constructor(message: string) {
        super(500, message);
    }
}

export default InvalidConfFileError;