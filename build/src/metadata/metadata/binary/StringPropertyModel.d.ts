/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
/**
 * Implementation of a `PropertyModel` for strings
 *
 * @internal
 */
export declare class StringPropertyModel implements PropertyModel {
    private static readonly decoder;
    private readonly valuesBuffer;
    private readonly stringOffsetsBuffer;
    private readonly stringOffsetType;
    constructor(valuesBuffer: Buffer, stringOffsetsBuffer: Buffer, stringOffsetType: string);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): string;
}
//# sourceMappingURL=StringPropertyModel.d.ts.map