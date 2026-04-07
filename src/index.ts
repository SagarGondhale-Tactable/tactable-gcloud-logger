import level, { EnvLevel, GcpLevel } from "./utils/level"
import { isBrowser, isNode } from "browser-or-node"
import { isGcloud, serviceContext, GCP } from "./utils/gcloud"

const shouldStdLog = (): boolean => isBrowser || (isNode && !isGcloud)
const expandErrors = (item: any): any => {
  // Escape newlines in error.message because stackdriver will truncate the error
  return item instanceof Error
    ? (item.stack || "").replace(item.message, item.message.replace(/\n/g, " \\n"))
    : item
}
const printObjects = (item: any): any => typeof item == "object" ? JSON.stringify(item) : item

export class Logger {
  logName: string

  constructor(logName = "") {
    this.logName = logName
  }

  public static create(logName: string): Logger {
    return new Logger(logName)
  }

  addLogName = (args: any[]): any[] => {
    return this.logName
      ? [`[ ${this.logName} ]`, ...args]
      : args
  }

  createGcpPayload =
    (severity: GcpLevel.DEBUG | GcpLevel.INFO | GcpLevel.WARN | GcpLevel.ERROR) =>
      (...args: any[]): string => {

        /**
         * If logger.error is passed only one argument and its a string, wrap it in an error
         * so that it will ping us in stackdriver
         */
        if (severity == GcpLevel.ERROR && args.length == 1 && typeof args[0] == "string") {
          args[0] = new Error(args[0])
        }

        return JSON.stringify({
          severity,
          "message": this.addLogName(args).map(expandErrors).map(printObjects).join(" "),
          ...serviceContext
        })
      }

  debug = (...args: any[]) => {
    if (level < EnvLevel.DEBUG) return
    if (shouldStdLog()) {
      console.log(...this.addLogName(args))
    } else {
      console.log(this.createGcpPayload(GcpLevel.DEBUG)(...args))
    }
  }

  info = (...args: any[]) => {
    if (level < EnvLevel.INFO) return
    if (shouldStdLog()) {
      console.log(...this.addLogName(args))
    } else {
      console.log(this.createGcpPayload(GcpLevel.INFO)(...args))
    }
  }

  warn = (...args: any[]) => {
    if (level < EnvLevel.WARN) return
    if (shouldStdLog()) {
      console.warn(...this.addLogName(args))
    } else {
      console.log(this.createGcpPayload(GcpLevel.WARN)(...args))
    }
  }

  error = (...args: any[]) => {
    if (shouldStdLog()) {
      console.error(...this.addLogName(args))
    } else {
      console.error(this.createGcpPayload(GcpLevel.ERROR)(...args))
    }
  }

  errIfProd = (...args: any[]) => {
    if (shouldStdLog()) {
      console.error(...this.addLogName(args))
    } else {
      if ((GCP.version || "").toLowerCase().includes("prod")) {
        console.error(this.createGcpPayload(GcpLevel.ERROR)(...args))
      } else {
        console.warn(this.createGcpPayload(GcpLevel.WARN)(...args))
      }
    }
  }
}

const defaultLogger = new Logger()

export default defaultLogger