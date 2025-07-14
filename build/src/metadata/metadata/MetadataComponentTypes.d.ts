/**
 * Internal utilities related to the `componentType` of the
 * `ClassProperty` instances of `MetadataClass` objects
 *
 * @internal
 */
export declare class MetadataComponentTypes {
    static readonly INT8 = "INT8";
    static readonly UINT8 = "UINT8";
    static readonly INT16 = "INT16";
    static readonly UINT16 = "UINT16";
    static readonly INT32 = "INT32";
    static readonly UINT32 = "UINT32";
    static readonly INT64 = "INT64";
    static readonly UINT64 = "UINT64";
    static readonly FLOAT32 = "FLOAT32";
    static readonly FLOAT64 = "FLOAT64";
    /**
     * The valid values for the `class.property.componentType` property
     */
    static allComponentTypes: string[];
    /**
     * Integer component types.
     * These are the types for which a property can be `normalized`,
     * and the valid values for the `enum.valueType` property
     */
    static integerComponentTypes: string[];
    /**
     * Unsigned component types.
     */
    static unsignedComponentTypes: string[];
    /**
     * Returns whether the given component type is an integer component
     * type.
     *
     * @param componentType - The component type
     * @returns Whether the component type is an integer component type
     */
    static isIntegerComponentType(componentType: string | undefined): boolean;
    /**
     * Returns whether the given component type is an unsigned component
     * type.
     *
     * @param componentType - The component type
     * @returns Whether the component type is an unsigned component type
     */
    static isUnsignedComponentType(componentType: string | undefined): boolean;
    /**
     * Returns the size of the given component type in bytes
     *
     * @param componentType - The type
     * @returns The size in bytes
     * @throws MetadataError If the given component type is not
     * one of the `allComponentTypes`
     */
    static byteSizeForComponentType(componentType: string): number;
    static normalize(value: number, componentType: string | undefined): number;
    private static maximumValue;
    private static minimumValue;
}
//# sourceMappingURL=MetadataComponentTypes.d.ts.map