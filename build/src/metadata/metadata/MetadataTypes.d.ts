/**
 * Internal utilities related to the `type` of the
 * `ClassProperty` instances of `MetadataClass` objects
 *
 * @internal
 */
export declare class MetadataTypes {
    static readonly SCALAR = "SCALAR";
    static readonly VEC2 = "VEC2";
    static readonly VEC3 = "VEC3";
    static readonly VEC4 = "VEC4";
    static readonly MAT2 = "MAT2";
    static readonly MAT3 = "MAT3";
    static readonly MAT4 = "MAT4";
    static readonly STRING = "STRING";
    static readonly BOOLEAN = "BOOLEAN";
    static readonly ENUM = "ENUM";
    /**
     * The valid values for the `class.property.type` property
     */
    static allTypes: string[];
    /**
     * The valid values for the `class.property.type` property
     * that count as "numeric" types. These are the ones where
     * a `class.property.componentType` is given
     */
    static numericTypes: string[];
    /**
     * Returns whether the given type is numeric, i.e. whether
     * it is SCALAR, VECn, or MATn.
     *
     * @param type - The type
     * @returns Whether the type is numeric
     */
    static isNumericType(type: string): boolean;
    /**
     * Returns the number of components for the given type
     *
     * @param type - The type
     * @returns The number of components
     * @throws MetadataError If the given string is not one
     * of the types contained in `allTypes`
     */
    static componentCountForType(type: string): number;
}
//# sourceMappingURL=MetadataTypes.d.ts.map