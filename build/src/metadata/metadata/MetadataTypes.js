"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataTypes = void 0;
const MetadataError_1 = require("./MetadataError");
/**
 * Internal utilities related to the `type` of the
 * `ClassProperty` instances of `MetadataClass` objects
 *
 * @internal
 */
class MetadataTypes {
    /**
     * Returns whether the given type is numeric, i.e. whether
     * it is SCALAR, VECn, or MATn.
     *
     * @param type - The type
     * @returns Whether the type is numeric
     */
    static isNumericType(type) {
        return MetadataTypes.numericTypes.includes(type);
    }
    /**
     * Returns the number of components for the given type
     *
     * @param type - The type
     * @returns The number of components
     * @throws MetadataError If the given string is not one
     * of the types contained in `allTypes`
     */
    static componentCountForType(type) {
        switch (type) {
            case MetadataTypes.SCALAR:
            case MetadataTypes.STRING:
            case MetadataTypes.ENUM:
            case MetadataTypes.BOOLEAN:
                return 1;
            case MetadataTypes.VEC2:
                return 2;
            case MetadataTypes.VEC3:
                return 3;
            case MetadataTypes.VEC4:
                return 4;
            case MetadataTypes.MAT2:
                return 4;
            case MetadataTypes.MAT3:
                return 9;
            case MetadataTypes.MAT4:
                return 16;
        }
        throw new MetadataError_1.MetadataError(`Invalid type: ${type}`);
    }
}
exports.MetadataTypes = MetadataTypes;
MetadataTypes.SCALAR = "SCALAR";
MetadataTypes.VEC2 = "VEC2";
MetadataTypes.VEC3 = "VEC3";
MetadataTypes.VEC4 = "VEC4";
MetadataTypes.MAT2 = "MAT2";
MetadataTypes.MAT3 = "MAT3";
MetadataTypes.MAT4 = "MAT4";
MetadataTypes.STRING = "STRING";
MetadataTypes.BOOLEAN = "BOOLEAN";
MetadataTypes.ENUM = "ENUM";
/**
 * The valid values for the `class.property.type` property
 */
MetadataTypes.allTypes = [
    MetadataTypes.SCALAR,
    MetadataTypes.VEC2,
    MetadataTypes.VEC3,
    MetadataTypes.VEC4,
    MetadataTypes.MAT2,
    MetadataTypes.MAT3,
    MetadataTypes.MAT4,
    MetadataTypes.STRING,
    MetadataTypes.BOOLEAN,
    MetadataTypes.ENUM,
];
/**
 * The valid values for the `class.property.type` property
 * that count as "numeric" types. These are the ones where
 * a `class.property.componentType` is given
 */
MetadataTypes.numericTypes = [
    MetadataTypes.SCALAR,
    MetadataTypes.VEC2,
    MetadataTypes.VEC3,
    MetadataTypes.VEC4,
    MetadataTypes.MAT2,
    MetadataTypes.MAT3,
    MetadataTypes.MAT4,
];
//# sourceMappingURL=MetadataTypes.js.map