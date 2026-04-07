import { isNode } from "browser-or-node"

export enum GcpLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARNING",
  ERROR = "ERROR"
}

export enum EnvLevel {
  DEBUG = 3,
  INFO = 2,
  WARN = 1,
  ERROR = 0
}

const envLogLevel = (isNode && process.env.LOG_LEVEL) || ""
let logLevel = "debug"
if (/^(debug|info|warn|error)$/i.test(envLogLevel)) {
  logLevel = envLogLevel
}

let level = EnvLevel.DEBUG
switch (logLevel.toLowerCase()) {
  case "debug": {
    level = EnvLevel.DEBUG
    break
  }
  case "info": {
    level = EnvLevel.INFO
    break
  }
  case "warn": {
    level = EnvLevel.WARN
    break
  }
  case "error": {
    level = EnvLevel.ERROR
    break
  }
}

export default level
