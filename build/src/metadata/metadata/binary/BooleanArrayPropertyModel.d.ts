/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
/**
 * Implementation of a `PropertyModel` for boolean arrays
 *
 * @internal
 */
export declare class BooleanArrayPropertyModel implements PropertyModel {
    private readonly valuesBuffer;
    private readonly arrayOffsetsBuffer;
    private readonly arrayOffsetType;
    private readonly count;
    constructor(valuesBuffer: Buffer, arrayOffsetsBuffer: Buffer | undefined, arrayOffsetType: string, count: number | undefined);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): boolean[];
}
//# sourceMappingURL=BooleanArrayPropertyModel.d.ts.map