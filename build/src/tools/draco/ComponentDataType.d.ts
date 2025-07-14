/**
 * Ported from CesiumJS 'ComponentDataType', ONLY for the use
 * in the draco package.
 *
 * @internal
 */
export declare class ComponentDatatype {
    /**
     * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
     * of an element in <code>Int8Array</code>.
     */
    static readonly BYTE = 5120;
    /**
     * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
     * of an element in <code>Uint8Array</code>.
     */
    static readonly UNSIGNED_BYTE = 5121;
    /**
     * 16-bit signed short corresponding to <code>SHORT</code> and the type
     * of an element in <code>Int16Array</code>.
     */
    static readonly SHORT = 5122;
    /**
     * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
     * of an element in <code>Uint16Array</code>.
     */
    static readonly UNSIGNED_SHORT = 5123;
    /**
     * 32-bit signed int corresponding to <code>INT</code> and the type
     * of an element in <code>Int32Array</code>.
     */
    static readonly INT = 5124;
    /**
     * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
     * of an element in <code>Uint32Array</code>.
     */
    static readonly UNSIGNED_INT = 5125;
    /**
     * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
     * of an element in <code>Float32Array</code>.
     */
    static readonly FLOAT = 5126;
    /**
     * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL;
     * and the type of an element in <code>Float64Array</code>.
     */
    static readonly DOUBLE = 5130;
    /**
     * Returns the size, in bytes, of the corresponding datatype.
     *
     * @param componentDatatype - The component datatype to get the size of.
     * @returns The size in bytes.
     *
     * @throws DracoError when componentDatatype is not a valid value.
     */
    static getSizeInBytes(componentDatatype: number): number;
    /**
     * Gets the {@link ComponentDatatype} for the provided TypedArray instance.
     *
     * @param array - The typed array.
     * @returns The ComponentDatatype for the provided array, or undefined if the array is not a TypedArray.
     */
    static fromTypedArray(array: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array): number;
    /**
     * Returns the string representation of the given data type.
     *
     * @param componentDatatype - The component datatype
     * @returns The string
     *
     * @throws DracoError when componentDatatype is not a valid value.
     */
    static toString(componentDatatype: number): "FLOAT" | "UNSIGNED_SHORT" | "BYTE" | "UNSIGNED_BYTE" | "SHORT" | "INT" | "UNSIGNED_INT" | "DOUBLE";
}
//# sourceMappingURL=ComponentDataType.d.ts.map