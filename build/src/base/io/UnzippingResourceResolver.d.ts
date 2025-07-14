/// <reference types="node" />
/// <reference types="node" />
import { ResourceResolver } from "./ResourceResolver";
/**
 * Implementation of a `ResourceResolver` that obtains the resource
 * data from a delegate, and unzips the data if necessary.
 *
 * @internal (Instantiated by the `ResourceResolvers` class)
 */
export declare class UnzippingResourceResolver implements ResourceResolver {
    private readonly _delegate;
    constructor(delegate: ResourceResolver);
    /** {@inheritDoc ResourceResolver.resolveUri} */
    resolveUri(uri: string): string;
    /** {@inheritDoc ResourceResolver.resolveData} */
    resolveData(uri: string): Promise<Buffer | undefined>;
    /** {@inheritDoc ResourceResolver.resolveDataPartial} */
    resolveDataPartial(uri: string, maxBytes: number): Promise<Buffer | undefined>;
    /** {@inheritDoc ResourceResolver.derive} */
    derive(uri: string): ResourceResolver;
}
//# sourceMappingURL=UnzippingResourceResolver.d.ts.map