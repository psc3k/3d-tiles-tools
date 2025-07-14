/**
 * Methods to compute the ("metadata") component type for numeric values.
 *
 * @internal
 */
export declare class NumberTypeDescriptions {
    /**
     * Computes the metadata component type suitable for the given value.
     *
     * This will be a type like `INT(n)`, `UINT(n)` or `FLOAT(n)`, with
     * `n` being the number of bits of the type.
     *
     * @param value - The input value
     * @returns The component type
     */
    static computeComponentType(value: number | bigint | number[] | bigint[] | number[][] | bigint[][]): string;
    /**
     * Creates the ("metadata") component type string for the given
     * number type description.
     *
     * This will be a type like `INT(n)`, `UINT(n)` or `FLOAT(n)`, with
     * `n` being the number of bits of the type.
     *
     * @param description - The number type description
     * @returns The component type
     */
    private static createComponentType;
    /**
     * Compute the (smallest) number type description that can represent
     * the given value.
     *
     * For floating point values, it will always be "FLOAT32".
     *
     * For integral values, it will be `INT(n)` or `UINT(n)`, with `n`
     * being the number of bits (8, 16, 32, or 64) that is required
     * to represent that value.
     *
     * @param value - The value
     * @returns The number type description
     */
    private static computeSingle;
    /**
     * Computes the smallest number of bits (8, 16, 32, or 64) that is
     * required to represent the given value.
     *
     * @param v - The value
     * @returns The number of required bits
     */
    private static computeRequiredBits;
    /**
     * Computes the smallest number type description that can represent
     * all the given values.
     *
     * @param values - The input values
     * @returns The smallest number type description
     */
    private static computeMinimal;
    /**
     * Computes the minimum of the given descriptions.
     *
     * This is the smallest description that covers both of the
     * given descriptions. It will therefore indicate...
     * - 'signed' if either of the inputs indicates 'signed'
     * - 'integral' if both inputs indicate 'integral'
     * - A number of bits that is the maximum (!) of both input bits
     *
     * @param a - The first description
     * @param b - The second description
     * @returns The minimum
     */
    private static min;
}
//# sourceMappingURL=NumberTypeDescriptions.d.ts.map