import NGNError from "./NGNError";

class FileNotFoundError extends NGNError{
    constructor(message: string) {
        super(404, message);
    }
}

export default FileNotFoundError;