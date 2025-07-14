/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
/**
 * Implementation of a `PropertyModel` for numeric types.
 *
 * This includes all types that have numeric component types,
 * i.e. the `SCALAR`, `VECn` and `MATn` types, and the
 * (binary, and therefore numeric) representation of `ENUM`.
 *
 * @internal
 */
export declare class NumericPropertyModel implements PropertyModel {
    private readonly type;
    private readonly valuesBuffer;
    private readonly componentType;
    constructor(type: string, valuesBuffer: Buffer, componentType: string);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): number | bigint | (number | bigint)[];
}
//# sourceMappingURL=NumericPropertyModel.d.ts.map