import { PropertyModel } from "./PropertyModel";
/**
 * Default implementation of a `PropertyModel` that is
 * backed by untyped JSON data.
 *
 * @internal
 */
export declare class DefaultPropertyModel implements PropertyModel {
    private readonly data;
    constructor(data: any[]);
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index: number): any;
}
//# sourceMappingURL=DefaultPropertyModel.d.ts.map