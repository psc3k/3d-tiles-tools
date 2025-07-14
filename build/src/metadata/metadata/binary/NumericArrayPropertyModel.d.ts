/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
/**
 * Implementation of a `PropertyModel` for numeric array types.
 *
 * This includes all types that have numeric component types,
 * i.e. the `SCALAR`, `VECn` and `MATn` types, and the
 * (binary, and therefore numeric) representation of `ENUM`.
 *
 * @internal
 */
export declare class NumericArrayPropertyModel implements PropertyModel {
    private readonly type;
    private readonly valuesBuffer;
    private readonly componentType;
    private readonly arrayOffsetsBuffer;
    private readonly arrayOffsetType;
    private readonly count;
    constructor(type: string, valuesBuffer: Buffer, componentType: string, arrayOffsetsBuffer: Buffer | undefined, arrayOffsetType: string, count: number | undefined);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): (number | bigint | (number | bigint)[])[];
}
//# sourceMappingURL=NumericArrayPropertyModel.d.ts.map