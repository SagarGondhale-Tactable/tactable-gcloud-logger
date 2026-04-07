import logger, { Logger } from "../dist"

describe("logger", () => {
  it("should log info normally", () => {
    logger.debug("debugging", "debugging2", 2342, 234, 23, 234)
    logger.info("info", "info2", 23432, "SDfsdf")
    logger.warn("warn message", "warning2")
    logger.error("found new error", new Error("FUUUCK"))
    logger.error(new Error("FUUUCK"))
    logger.error(new Error("error line1\nerror line 2\nerror line 3\nerror line 4"))
    logger.error("one", "two", "three", new Error("FUCK"))
    logger.info("object expansion", { a: { b: "c"}}, { d: { e: "f"}})
    logger.info({ b: "c"}, ` received webhook for ${"test"}: ${"topic"} `)

  })

  it("should log info normally with logname", () => {
    const myLogger = new Logger("my logger")
    myLogger.debug("debugging", "debugging2", 2342, 234, 23, 234)
    myLogger.info("info", "info2", 23432, "SDfsdf")
    myLogger.warn("warn message", "warning2")
    myLogger.error("found new error", new Error("FUUUCK"))
    myLogger.error(new Error("FUUUCK"))
    myLogger.error("one", "two", "three", new Error("FUCK"))
    myLogger.error("hello")
    myLogger.info("object expansion", { a: { b: "c"}}, { d: { e: "f"}})
  })

  it("should log info normally with logname 2", () => {
    const newlogger = Logger.create("new logger")
    newlogger.debug("debugging", "debugging2", 2342, 234, 23, 234)
    newlogger.info("info", "info2", 23432, "SDfsdf")
    newlogger.warn("warn message", "warning2")
    newlogger.error("found new error", new Error("FUUUCK"))
    newlogger.error(new Error("FUUUCK"))
    newlogger.error("one", "two", "three", new Error("FUCK"))
    newlogger.info("object expansion", { a: { b: "c"}}, { d: { e: "f"}})
  })

  it("should log as warn if not prod", () => {
    const newlogger = Logger.create("new logger")
    newlogger.errIfProd("debugging", "debugging2", 2342, 234, 23, 234)
    newlogger.errIfProd("info", "info2", 23432, "SDfsdf")
    newlogger.errIfProd("warn message", "warning2")
    newlogger.errIfProd("found new error", new Error("FUUUCK"))
    newlogger.errIfProd(new Error("FUUUCK"))
    newlogger.errIfProd("one", "two", "three", new Error("FUCK"))
    newlogger.errIfProd("object expansion", { a: { b: "c"}}, { d: { e: "f"}})
  })
})

