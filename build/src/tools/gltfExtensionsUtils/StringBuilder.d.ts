/**
 * Internal utility class to build formatted strings
 *
 * @internal
 */
export declare class StringBuilder {
    private s;
    private indent;
    private indentation;
    constructor();
    increaseIndent(): void;
    decreaseIndent(): void;
    addLine(...args: any[]): void;
    toString(): string;
}
//# sourceMappingURL=StringBuilder.d.ts.map