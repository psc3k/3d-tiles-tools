"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPointCloud = void 0;
const base_1 = require("../../base");
const tilesets_1 = require("../../tilesets");
/**
 * Implementation of a `ReadablePointCloud` where the
 * attribute values may be set directly.
 *
 * @internal
 */
class DefaultPointCloud {
    constructor() {
        /**
         * The mapping from attribute names to values
         */
        this.attributeValues = {};
        /**
         * The mapping from attribute names to their types,
         * e.g. `SCALAR` or `VEC3`
         */
        this.attributeTypes = {};
        /**
         * The mapping from attribute names to their component types,
         * e.g. `UINT8` or `FLOAT32`
         */
        this.attributeComponentTypes = {};
    }
    /**
     * Set the given positions as the POSITION attribute
     *
     * @param positions - The positions, as 3D floating point values
     */
    setPositions(positions) {
        this.addAttribute("POSITION", "VEC3", "FLOAT32", base_1.Iterables.flatten(positions));
    }
    /**
     * Set the given normals as the NORMAL attribute
     *
     * @param normals - The normals, as 3D floating point values
     */
    setNormals(normals) {
        this.addAttribute("NORMAL", "VEC3", "FLOAT32", base_1.Iterables.flatten(normals));
    }
    /**
     * Set the given colors as the COLOR_0 attribute
     *
     * @param colors - The colors, as linear RGBA values in [0.0, 1.0]
     */
    setNormalizedLinearColors(colors) {
        this.addAttribute("COLOR_0", "VEC4", "FLOAT32", base_1.Iterables.flatten(colors));
    }
    /**
     * Add the given attribute to this point cloud
     *
     * @param name - The name, e.g. `"POSITION"`
     * @param type - The type, e.g. `"VEC3"`
     * @param componentType - The component type, e.g. `"FLOAT32"`
     * @param attribute - The attribute values
     */
    addAttribute(name, type, componentType, attribute) {
        this.attributeTypes[name] = type;
        this.attributeComponentTypes[name] = componentType;
        this.attributeValues[name] = attribute;
    }
    /** {@inheritDoc ReadablePointCloud.getPositions} */
    getPositions() {
        const values = this.getAttributeValues("POSITION");
        if (!values) {
            throw new tilesets_1.TileFormatError("No POSITION values have been added");
        }
        return base_1.Iterables.segmentize(values, 3);
    }
    /** {@inheritDoc ReadablePointCloud.getGlobalPosition} */
    getGlobalPosition() {
        return this.globalPosition;
    }
    setGlobalPosition(globalPosition) {
        this.globalPosition = globalPosition;
    }
    /** {@inheritDoc ReadablePointCloud.getNormals} */
    getNormals() {
        const values = this.getAttributeValues("NORMAL");
        if (!values) {
            return undefined;
        }
        return base_1.Iterables.segmentize(values, 3);
    }
    /** {@inheritDoc ReadablePointCloud.getNormalizedLinearColors} */
    getNormalizedLinearColors() {
        const values = this.getAttributeValues("COLOR_0");
        if (!values) {
            return undefined;
        }
        return base_1.Iterables.segmentize(values, 4);
    }
    setNormalizedLinearGlobalColor(globalColor) {
        this.globalColor = globalColor;
    }
    /** {@inheritDoc ReadablePointCloud.getNormalizedLinearGlobalColor} */
    getNormalizedLinearGlobalColor() {
        if (this.globalColor) {
            return [...this.globalColor];
        }
        return undefined;
    }
    /** {@inheritDoc ReadablePointCloud.getAttributes} */
    getAttributes() {
        return Object.keys(this.attributeValues);
    }
    /** {@inheritDoc ReadablePointCloud.getAttributeValues} */
    getAttributeValues(name) {
        const values = this.attributeValues[name];
        if (!values) {
            return undefined;
        }
        return values;
    }
    /** {@inheritDoc ReadablePointCloud.getAttributeType} */
    getAttributeType(name) {
        return this.attributeTypes[name];
    }
    /** {@inheritDoc ReadablePointCloud.getAttributeComponentType} */
    getAttributeComponentType(name) {
        return this.attributeComponentTypes[name];
    }
}
exports.DefaultPointCloud = DefaultPointCloud;
//# sourceMappingURL=DefaultPointCloud.js.map