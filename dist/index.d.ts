import { GcpLevel } from "./utils/level";
export declare class Logger {
    logName: string;
    constructor(logName?: string);
    static create(logName: string): Logger;
    addLogName: (args: any[]) => any[];
    createGcpPayload: (severity: GcpLevel) => (...args: any[]) => string;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    errIfProd: (...args: any[]) => void;
}
declare const defaultLogger: Logger;
export default defaultLogger;
