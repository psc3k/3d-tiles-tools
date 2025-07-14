/// <reference types="node" />
/// <reference types="node" />
import { ResourceResolver } from "../../base";
import { TilesetSource } from "../tilesetData/TilesetSource";
/**
 * Implementation of a `ResourceResolver` based on a `TilesetSource`
 *
 * @internal
 */
export declare class TilesetSourceResourceResolver implements ResourceResolver {
    private readonly _basePath;
    private readonly _tilesetSource;
    constructor(basePath: string, tilesetSource: TilesetSource);
    /** {@inheritDoc ResourceResolver.resolveUri} */
    resolveUri(uri: string): string;
    /** {@inheritDoc ResourceResolver.resolveData} */
    resolveData(uri: string): Promise<Buffer | undefined>;
    /** {@inheritDoc ResourceResolver.resolveDataPartial} */
    resolveDataPartial(uri: string, maxBytes: number): Promise<Buffer | undefined>;
    private resolveDataInternal;
    /** {@inheritDoc ResourceResolver.derive} */
    derive(uri: string): ResourceResolver;
}
//# sourceMappingURL=TilesetSourceResourceResolver.d.ts.map