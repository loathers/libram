import { logprint, printHtml } from "kolmafia";
export enum LogLevels {
  NONE = 0,
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
  DEBUG = 4,
}

const defaultHandlers = {
  [LogLevels.INFO]: (message: string): unknown => {
    printHtml(`<b>[Libram Info]</b> ${message}`);
    logprint(`[Libram] ${message}`);
    return;
  },
  [LogLevels.WARNING]: (message: string): unknown => {
    printHtml(
      `<span style="background: orange; color: white;"><b>[Libram Warning]</b> ${message}</span>`
    );
    logprint(`[Libram] ${message}`);
    return;
  },
  [LogLevels.ERROR]: (error: string | Error): unknown => {
    printHtml(
      `<span style="background: red; color: white;"><b>[Libram Error]</b> ${error.toString()}</span>`
    );
    logprint(`[Libram] ${error}`);
    return;
  },
  [LogLevels.DEBUG]: (message: string): unknown => {
    printHtml(
      `<span style="background: red; color: white;"><b>[Libram Debug]</b> ${message}</span>`
    );
    logprint(`[Libram] ${message}`);
    return;
  },
};

type LogLevel = keyof typeof defaultHandlers;
type LogFunction<T extends LogLevel> = typeof defaultHandlers[T];

class Logger {
  debugMode = false
  handlers = defaultHandlers;
  private static currentLevel = LogLevels.ERROR;

  get level(): LogLevels {
    return Logger.currentLevel;
  }

  setLevel(level: LogLevels): void {
    Logger.currentLevel = level;
  }

  setHandler<T extends LogLevel>(level: T, callback: LogFunction<T>): void {
    this.handlers[level] = callback;
  }

  log(level: LogLevels.ERROR, message: string | Error): void;
  log(level: LogLevel, message: string): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(level: LogLevel, message: any): void {
    if (this.level >= level) this.handlers[level](message);
  }

  info(message: string) {
    this.log(LogLevels.INFO, message);
  }

  warning(message: string) {
    this.log(LogLevels.WARNING, message);
  }

  error(message: string | Error) {
    this.log(LogLevels.ERROR, message);
  }

  debug(message: string) {
    this.log(LogLevels.DEBUG, message);
  }
}

export default new Logger();
