/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
/**
 * Implementation of a `PropertyModel` for booleans
 *
 * @internal
 */
export declare class BooleanPropertyModel implements PropertyModel {
    private readonly valuesBuffer;
    constructor(valuesBuffer: Buffer);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): boolean;
}
//# sourceMappingURL=BooleanPropertyModel.d.ts.map