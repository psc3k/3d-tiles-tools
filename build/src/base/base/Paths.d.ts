/**
 * Utility methods related to paths.
 *
 * The methods in this class are mainly convenience wrappers
 * around certain `fs`- and `path` functions.
 *
 * Unless otherwise noted, methods that return string
 * representations of paths will use the forward slash `/`
 * as the directory separator, regardless of the operating
 * system.
 *
 * @internal
 */
export declare class Paths {
    /**
     * Ensures that the given directory exists, creating it
     * and all its parent directories if necessary.
     *
     * @param directory - The directory
     */
    static ensureDirectoryExists(directory: string): void;
    /**
     * Returns whether the given path is an existing directory
     *
     * @param p - The path
     * @returns Whether the path is an existing directory
     */
    static isDirectory(p: string): boolean;
    /**
     * Returns whether the given file name has one of the given
     * extensions, case-insensitively.
     *
     * @param fileName - The file name
     * @param extensions - The extensions to check, in lowercase,
     * and including the `.` dot.
     * @returns Whether the file name has one of the given extensions.
     */
    static hasExtension(fileName: string, ...extensions: string[]): boolean;
    /**
     * Replace the extension in the given file name with the new one.
     *
     * If the given file name does not have an extension, then the
     * given extension is appended.
     *
     * @param fileName - The file name
     * @param newExtension - The new extension (including the `.` dot)
     * @returns The new name
     */
    static replaceExtension(fileName: string, newExtension: string): string;
    /**
     * Does whatever `path.join` does, but makes sure that
     * the result uses `/` forward slashes as the directory
     * separator.
     *
     * @param paths - The input paths
     * @returns The resulting joined path
     */
    static join(...paths: string[]): string;
    /**
     * Does whatever `path.resolve` does, but makes sure that
     * the result uses `/` forward slashes as the directory
     * separator.
     *
     * @param paths - The input paths
     * @returns The resulting resolved path
     */
    static resolve(...paths: string[]): string;
    /**
     * Does whatever `path.relative` does, but makes sure that
     * the result uses `/` forward slashes as the directory
     * separator.
     *
     * Note:
     * - The first argument is assumed to be a directory
     * - The second argument is assumed to be a file name
     * - The result is the relativized file name
     *
     * For example: In a call like
     * `relativize("./example/directoryA", "./example/directoryB/file.txt")`
     * the second argument has to be the file name, and the result
     * will be "../directoryB/file.txt", which is the path of the
     * file _relative to_ the directory that is given as the first argument.
     *
     * @param directory - The directory
     * @param fileName - The file name
     * @returns The resulting path
     */
    static relativize(directory: string, fileName: string): string;
    /**
     * Internal method to replace `\` backslashes with `/` forward slashes.
     *
     * @param p - The input path
     * @returns The result
     */
    private static normalize;
}
//# sourceMappingURL=Paths.d.ts.map