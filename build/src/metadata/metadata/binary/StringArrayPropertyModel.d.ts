/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
/**
 * Implementation of a `PropertyModel` for string arrays
 *
 * @internal
 */
export declare class StringArrayPropertyModel implements PropertyModel {
    private static readonly decoder;
    private readonly valuesBuffer;
    private readonly arrayOffsetsBuffer;
    private readonly arrayOffsetType;
    private readonly stringOffsetsBuffer;
    private readonly stringOffsetType;
    private readonly count;
    constructor(valuesBuffer: Buffer, arrayOffsetsBuffer: Buffer | undefined, arrayOffsetType: string, stringOffsetsBuffer: Buffer, stringOffsetType: string, count: number | undefined);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): string[];
}
//# sourceMappingURL=StringArrayPropertyModel.d.ts.map