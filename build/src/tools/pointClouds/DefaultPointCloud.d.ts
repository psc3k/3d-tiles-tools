import { ReadablePointCloud } from "./ReadablePointCloud";
/**
 * Implementation of a `ReadablePointCloud` where the
 * attribute values may be set directly.
 *
 * @internal
 */
export declare class DefaultPointCloud implements ReadablePointCloud {
    /**
     * The mapping from attribute names to values
     */
    private readonly attributeValues;
    /**
     * The mapping from attribute names to their types,
     * e.g. `SCALAR` or `VEC3`
     */
    private readonly attributeTypes;
    /**
     * The mapping from attribute names to their component types,
     * e.g. `UINT8` or `FLOAT32`
     */
    private readonly attributeComponentTypes;
    /**
     * An optional global color (linear RGBA, in [0.0, 1.0])
     */
    private globalColor;
    /**
     * An optional position that the positions are relative to
     */
    private globalPosition;
    /**
     * Set the given positions as the POSITION attribute
     *
     * @param positions - The positions, as 3D floating point values
     */
    setPositions(positions: Iterable<number[]>): void;
    /**
     * Set the given normals as the NORMAL attribute
     *
     * @param normals - The normals, as 3D floating point values
     */
    setNormals(normals: Iterable<number[]>): void;
    /**
     * Set the given colors as the COLOR_0 attribute
     *
     * @param colors - The colors, as linear RGBA values in [0.0, 1.0]
     */
    setNormalizedLinearColors(colors: Iterable<number[]>): void;
    /**
     * Add the given attribute to this point cloud
     *
     * @param name - The name, e.g. `"POSITION"`
     * @param type - The type, e.g. `"VEC3"`
     * @param componentType - The component type, e.g. `"FLOAT32"`
     * @param attribute - The attribute values
     */
    addAttribute(name: string, type: string, componentType: string, attribute: Iterable<number>): void;
    /** {@inheritDoc ReadablePointCloud.getPositions} */
    getPositions(): Iterable<number[]>;
    /** {@inheritDoc ReadablePointCloud.getGlobalPosition} */
    getGlobalPosition(): [number, number, number] | undefined;
    setGlobalPosition(globalPosition: [number, number, number] | undefined): void;
    /** {@inheritDoc ReadablePointCloud.getNormals} */
    getNormals(): Iterable<number[]> | undefined;
    /** {@inheritDoc ReadablePointCloud.getNormalizedLinearColors} */
    getNormalizedLinearColors(): Iterable<number[]> | undefined;
    setNormalizedLinearGlobalColor(globalColor: [number, number, number, number] | undefined): void;
    /** {@inheritDoc ReadablePointCloud.getNormalizedLinearGlobalColor} */
    getNormalizedLinearGlobalColor(): [number, number, number, number] | undefined;
    /** {@inheritDoc ReadablePointCloud.getAttributes} */
    getAttributes(): string[];
    /** {@inheritDoc ReadablePointCloud.getAttributeValues} */
    getAttributeValues(name: string): Iterable<number> | undefined;
    /** {@inheritDoc ReadablePointCloud.getAttributeType} */
    getAttributeType(name: string): string | undefined;
    /** {@inheritDoc ReadablePointCloud.getAttributeComponentType} */
    getAttributeComponentType(name: string): string | undefined;
}
//# sourceMappingURL=DefaultPointCloud.d.ts.map