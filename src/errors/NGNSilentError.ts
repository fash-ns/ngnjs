import NGNError from "./NGNError";

class NGNSilentError extends NGNError{
    public isPrivateMessage: boolean = true;
}

export default NGNSilentError;