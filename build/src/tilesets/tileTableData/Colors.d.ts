/**
 * Methods for color conversions.
 *
 * These methods convert between different color representations.
 *
 * The terms "RGB" and "RGBA" refer to values in [0,255], unless
 * they are referred to as "Normalized".
 *
 * The prefix "Normalized" indicates that the RGB/RGBA values
 * are in [0.0, 1.0].
 *
 * The prefix "standard" indicates sRGB/sRGBA values.
 *
 * The prefix "linear" indicates linear RGB/RGBA values (often
 * used as factors).
 *
 * @internal
 */
export declare class Colors {
    /**
     * Converts three sRGB values in [0,255] to linear RGBA values
     * in [0.0, 1.0].
     *
     * @param input - The three sRGB components
     * @returns The four linear RGBA components
     */
    static standardRGBToNormalizedLinearRGBA(input: number[]): number[];
    /**
     * Converts four sRGB values in [0,255] to linear RGBA values
     * in [0.0, 1.0].
     *
     * @param input - The four sRGBA components
     * @returns The four linear RGBA components
     */
    static standardRGBAToNormalizedLinearRGBA(input: number[]): number[];
    /**
     * Converts a standard sRGB656 value to linear RGBA values
     * in [0.0, 1.0].
     *
     * @param input - The sRGB565 value
     * @returns The four linear RGBA components
     */
    static standardRGB565ToNormalizedLinearRGBA(input: number): number[];
    private static normalizedStandardRGBAToNormalizedLinearRGBA;
    /**
     * Decodes the given standard RGB656 value into normalized standard
     * RGBA components (i.e. into four values in [0.0, 1.0]).
     *
     * @param value - The RGB656 value
     * @returns The normalized standard RGB components
     */
    private static decodeStandardRGB565ToNormalizedStandardRGBA;
}
//# sourceMappingURL=Colors.d.ts.map