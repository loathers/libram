import { printHtml } from "kolmafia";

const defaultHandlers = {
  info: (message: string): unknown => printHtml(`<b>[Libram]</b> ${message}`),
  warning: (message: string): unknown =>
    printHtml(
      `<span style="background: orange; color: white;"><b>[Libram]</b> ${message}</span>`
    ),
  error: (error: string | Error): unknown =>
    printHtml(
      `<span style="background: red; color: white;"><b>[Libram]</b> ${error.toString()}</span>`
    ),
  debug: (message: string): unknown => {
    if (Logger.debugMode) {
      printHtml(
        `<span style="background: red; color: white;"><b>[Libram Debug]</b> ${message}</span>`
      );
      return;
    }
  },
};

export type LogLevel = keyof typeof defaultHandlers;
type LogFunction<T extends LogLevel> = typeof defaultHandlers[T];

class Logger {
  handlers = defaultHandlers;
  private static debug = false;

  static get debugMode(): boolean {
    return Logger.debug;
  }
  static set debugActive(debug: boolean) {
    Logger.debug = debug;
  }

  setHandler<T extends LogLevel>(level: T, callback: LogFunction<T>): void {
    this.handlers[level] = callback;
  }

  log(level: "error", message: string | Error): void;
  log(level: "warning" | "info" | "debug", message: string): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(level: LogLevel, message: any): void {
    this.handlers[level](message);
  }

  info(message: string) {
    this.log("info", message);
  }

  warning(message: string) {
    this.log("warning", message);
  }

  error(message: string | Error) {
    this.log("error", message);
  }

  debug(message: string) {
    this.log("debug", message);
  }
}

export default new Logger();
