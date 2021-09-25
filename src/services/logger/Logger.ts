import LoggerInterface, {LogLevels, LogLevelsString} from "services/logger/LoggerInterface";
import fs from "fs";
import Keyable from "types/Keyable";

class Logger implements LoggerInterface {
    private readonly logFileName: string;
    private readonly logLevel: LogLevels;
    private static instance: Logger | null = null;

    private constructor() {
        const logLevel: LogLevelsString = <LogLevelsString>process.env.LOG_LEVEL ?? "DEBUG";
        this.logLevel = LogLevels[logLevel];
        const dateObj = new Date();
        const year = dateObj.getFullYear();
        const monthNum = dateObj.getMonth() + 1;
        let month = monthNum.toString();
        if (monthNum < 10) month = "0" + month;
        const dayNum = dateObj.getDate();
        let day = dayNum.toString();
        if (dayNum < 10) day = "0" + day;
        this.logFileName = `storage/logs/${year}-${month}-${day}.log`;
        if (!fs.existsSync(this.logFileName))
            fs.writeFile(this.logFileName, "", () => {});
    }

    public static getInstance(){
        if(Logger.instance === null)
            Logger.instance = new Logger();
        return Logger.instance
    }

    alert(message: string, context: Keyable): void {
        this.log(LogLevels.ALERT, message, context);
    }

    critical(message: string, context: Keyable): void {
        this.log(LogLevels.CRITICAL, message, context);
    }

    debug(message: string, context: Keyable): void {
        this.log(LogLevels.DEBUG, message, context);
    }

    emergency(message: string, context: Keyable): void {
        this.log(LogLevels.EMERGENCY, message, context);
    }

    error(message: string, context: Keyable): void {
        this.log(LogLevels.ERROR, message, context);
    }

    info(message: string, context: Keyable): void {
        this.log(LogLevels.INFO, message, context);
    }

    log(level: LogLevels, message: string, context: Keyable): void {
        if (level <= this.logLevel) {
            for (let key in context) {
                if (context.hasOwnProperty(key) && typeof context[key] === "string")
                    message = message.replace(`{${key}}`, context[key]);
            }
            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false
            }
            const date = new Date().toLocaleString("UTC", dateOptions);
            let data = `[${LogLevels[level]} - ${date}]\t${message}: ` + JSON.stringify(context) + "\n";
            fs.appendFile(this.logFileName, data, () => {});
        }
    }

    notice(message: string, context: Keyable): void {
        this.log(LogLevels.NOTICE, message, context);
    }

    warning(message: string, context: Keyable): void {
        this.log(LogLevels.WARNING, message, context);
    }

}

export default Logger;