import Keyable from "types/Keyable";

export enum LogLevels {
    "EMERGENCY",
    "ALERT",
    "CRITICAL",
    "ERROR",
    "WARNING",
    "NOTICE",
    "INFO",
    "DEBUG"
}

export type LogLevelsString = keyof typeof LogLevels;

export default interface LoggerInterface {
    emergency(message: string, context: Keyable): void;

    alert(message: string, context: Keyable): void;

    critical(message: string, context: Keyable): void;

    error(message: string, context: Keyable): void;

    warning(message: string, context: Keyable): void;

    notice(message: string, context: Keyable): void;

    info(message: string, context: Keyable): void;

    debug(message: string, context: Keyable): void;

    log(level: LogLevels, message: string, context: Keyable): void;
}