import NGNSilentError from "./NGNSilentError";

class DatabaseError extends NGNSilentError{
    constructor(message: string) {
        super(500, message);
    }
}

export default DatabaseError;