/**
 * Internal utility methods related to IDs
 *
 * @internal
 */
export declare class Ids {
    /**
     * Make sure that the given identifier matches the requirements
     * for an ID in the 3D Metadata specification.
     *
     * This will replace any characters with `_` underscores if they
     * do not match the regex `"^[a-zA-Z_][a-zA-Z0-9_]*$"`.
     *
     * @param identifier - The identifier
     * @returns The sanitized identifier
     */
    static sanitize(identifier: string): string;
    private static isAlpha;
    private static isUpperAlpha;
    private static isLowerAlpha;
    private static isNumeric;
}
//# sourceMappingURL=Ids.d.ts.map