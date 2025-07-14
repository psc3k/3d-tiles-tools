/// <reference types="node" />
/// <reference types="node" />
import { ResourceResolver } from "./ResourceResolver";
/**
 * Implementation of a `ResourceResolver` based on a file system.
 *
 * @internal (Instantiated by the `ResourceResolvers` class)
 */
export declare class FileResourceResolver implements ResourceResolver {
    private readonly _basePath;
    constructor(basePath: string);
    /** {@inheritDoc ResourceResolver.resolveUri} */
    resolveUri(uri: string): string;
    /** {@inheritDoc ResourceResolver.resolveDataPartial} */
    resolveDataPartial(uri: string, maxBytes: number): Promise<Buffer | undefined>;
    /** {@inheritDoc ResourceResolver.resolveData} */
    resolveData(uri: string): Promise<Buffer | undefined>;
    /** {@inheritDoc ResourceResolver.derive} */
    derive(uri: string): ResourceResolver;
}
//# sourceMappingURL=FileResourceResolver.d.ts.map