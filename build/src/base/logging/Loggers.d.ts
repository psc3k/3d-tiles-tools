import { Logger } from "pino";
/**
 * Methods for creating and maintaining logger instances.
 *
 * @internal
 */
export declare class Loggers {
    /**
     * A mapping from names to logger instances
     */
    private static allLoggers;
    /**
     * The default (root) logger
     */
    private static defaultLogger;
    /**
     * Internal function to create a pino Logger with default configuration.
     *
     * @param toConsole - Whether log output should be pretty-printed to the console
     * (default: `true`)
     * @param logFilePath - The path of the log file to write, or `undefined`
     * to write no log file (default: `undefined`)
     * @returns The Logger
     */
    private static createDefaultLogger;
    /**
     * Derive a name for a logger from the given string.
     *
     * If the string contains path separators (i.e. if it contains `/`
     * or `\\`), then the part after the last `/` or `\\` will be
     * returned as the name. Otherwise, the given name will be returned.
     *
     * @param loggerName - The logger name
     * @returns The name
     */
    private static deriveName;
    /**
     * Initialize the default logger.
     *
     * This is supposed to be called at application startup (from the
     * command line), and creates the logger that all loggers will be
     * children of.
     *
     * @param prettyPrint - Whether the logger should be pretty-printing
     * to the console
     */
    static initDefaultLogger(prettyPrint?: boolean): void;
    /**
     * Set the log level that is supposed to be used for all loggers
     *
     * @param level - The log level
     */
    static setLevel(level: string): void;
    /**
     * Returns the logger for the specified name.
     *
     * If the `loggerName` is undefined or an empty string, then a default
     * logger will be returned. If the logger for the specified name does
     * not yet exist, then it will be created.
     *
     * The given name will be included as a `name` in the log messages.
     * If the given name is a path (i.e. if it contains `/` or `\\`),
     * then the part after the last `/` or `\\` will be used as the name.
     *
     * Example:
     * ```
     * import { Loggers } from "../src/logging/Loggers";
     * const logger = Loggers.get(__filename);
     * ```
     *
     * @param loggerName - An optional name
     * @returns The Logger
     */
    static get(loggerName?: string): Logger;
}
//# sourceMappingURL=Loggers.d.ts.map